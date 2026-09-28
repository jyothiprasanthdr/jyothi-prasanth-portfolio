// Home notebook behaviour. All content is in the HTML; this only adds the run cascade,
// the contents now-marker, keyboard command mode, dialogs, expanders, and copy-to-clipboard.

const root = document.documentElement;
const cells = [...document.querySelectorAll<HTMLElement>('[data-cell]')];
const kernel = document.querySelector<HTMLElement>('[data-kernel]');

const RUN_MS = 150; // how long a code cell shows In [*]:
const STAGGER_MS = 60; // gap before the next cell starts

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Markdown cells only change state (they render); code cells also show In [ ]: -> In [*]: -> In [n]:.
function setPrompt(cell: HTMLElement, state: 'pending' | 'running' | 'done') {
  cell.dataset.state = state;
  const prompt = cell.querySelector<HTMLElement>('[data-prompt]');
  if (!prompt) return;
  if (state === 'running') prompt.innerHTML = 'In <span class="chip">[*]</span>:';
  else prompt.textContent = state === 'pending' ? 'In [ ]:' : `In [${cell.dataset.count}]:`;
}

// ---------- Run all ----------
let queue = Promise.resolve();
let runToken = 0;
const visible = new Set<HTMLElement>();

function checkFinished() {
  if (cells.every((c) => c.dataset.state === 'done')) finishRun();
}

// Animated execution for a cell the reader can see.
function execute(cell: HTMLElement, token: number) {
  queue = queue.then(async () => {
    if (token !== runToken || cell.dataset.state !== 'pending') return;
    if (cell.dataset.kind === 'code') {
      setPrompt(cell, 'running');
      kernel?.setAttribute('data-busy', '');
      await wait(RUN_MS);
      if (token !== runToken) return;
      kernel?.removeAttribute('data-busy');
    }
    setPrompt(cell, 'done');
    await wait(STAGGER_MS);
    checkFinished();
  });
}

// Cells the reader jumped or scrolled past complete instantly, so nothing sits blank off-screen.
function completeUnseenBefore(index: number) {
  cells.slice(0, index).forEach((c) => {
    if (c.dataset.state === 'pending' && !visible.has(c)) setPrompt(c, 'done');
  });
}

function finishRun() {
  delete root.dataset.run;
  kernel?.removeAttribute('data-busy');
  try {
    sessionStorage.setItem('nb-ran', '1');
  } catch {}
}

function startRun(runEverything: boolean) {
  runToken += 1;
  const token = runToken;
  queue = Promise.resolve();
  root.dataset.run = 'running';
  cells.forEach((c) => setPrompt(c, 'pending'));

  if (runEverything) {
    cells.forEach((c) => execute(c, token));
    return;
  }

  // First visit: cells run in order as they come into view, so the page executes as you read it.
  const seen = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const cell = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(cell);
        else visible.delete(cell);
      });
      entries.forEach((entry) => {
        if (!entry.isIntersecting || token !== runToken) return;
        const cell = entry.target as HTMLElement;
        const index = cells.indexOf(cell);
        completeUnseenBefore(index);
        cells.slice(0, index + 1).filter((c) => visible.has(c)).forEach((c) => execute(c, token));
      });
      checkFinished();
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  cells.forEach((c) => seen.observe(c));
}

if (root.dataset.run === 'pending') startRun(false);

// An explicit jump (Contents link, shared anchor) completes everything up to the target at once.
window.addEventListener('hashchange', () => {
  if (!root.dataset.run) return;
  const target = cells.findIndex((c) => `#${c.id}` === location.hash);
  if (target === -1) return;
  cells.slice(0, target + 1).forEach((c) => {
    if (c.dataset.state !== 'done') setPrompt(c, 'done');
  });
  checkFinished();
});

document.querySelector('[data-run-all]')?.addEventListener('click', () => startRun(true));

// ---------- Contents now-marker (scroll-spy) ----------
const railLinks = new Map(
  [...document.querySelectorAll<HTMLAnchorElement>('[data-rail-link]')].map((a) => [a.dataset.railLink!, a]),
);
const sectionOf = (cell: HTMLElement) => {
  for (let i = cells.indexOf(cell); i >= 0; i--) if (cells[i].dataset.toc) return cells[i].id;
  return cells[0].id;
};
let current = '';

// The current section is marked in both places: the rail link and the section's own gutter number.
function markCurrent(id: string) {
  current = id;
  railLinks.forEach((link, key) => {
    if (key === id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  cells.forEach((c) => {
    if (c.id === id) c.dataset.current = '';
    else delete c.dataset.current;
  });
}

const spy = new IntersectionObserver(
  (entries) => {
    const hit = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)[0];
    if (!hit) return;
    const id = sectionOf(hit);
    if (id === current) return;
    markCurrent(id);
    if (location.hash !== `#${id}`) history.replaceState(null, '', id === cells[0].id ? location.pathname : `#${id}`);
  },
  { rootMargin: '-30% 0px -65% 0px' },
);
cells.forEach((c) => spy.observe(c));

const lastSection = [...cells].reverse().find((c) => c.dataset.toc)!;
const footer = document.querySelector('.site-footer');
if (footer) {
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    markCurrent(lastSection.id);
  }).observe(footer);
}

// ---------- Keyboard command mode (instant, never animated) ----------
function focusCell(index: number) {
  const cell = cells[Math.max(0, Math.min(cells.length - 1, index))];
  cell.scrollIntoView({ block: 'start', behavior: 'instant' });
  cell.dataset.kbdFocus = '';
  cell.addEventListener('blur', () => delete cell.dataset.kbdFocus, { once: true });
  cell.focus({ preventScroll: true });
}

function activeIndex() {
  const focused = cells.indexOf(document.activeElement as HTMLElement);
  if (focused !== -1) return focused;
  const line = window.innerHeight * 0.3;
  const idx = cells.findIndex((c) => c.getBoundingClientRect().bottom > line);
  return idx === -1 ? cells.length - 1 : idx;
}

document.addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement;
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
  if (target.closest('input, textarea, select, [contenteditable], dialog[open]')) return;

  if (e.key === 'j' || (e.key === 'Enter' && e.shiftKey)) {
    e.preventDefault();
    focusCell(activeIndex() + 1);
  } else if (e.key === 'k') {
    e.preventDefault();
    focusCell(activeIndex() - 1);
  } else if (e.key === 'r' && !e.shiftKey) {
    location.href = '/resume';
  } else if (e.key === '?') {
    e.preventDefault();
    openDialog('shortcuts-dialog');
  }
});

// ---------- Dialogs ----------
function openDialog(id: string) {
  document.querySelector<HTMLDialogElement>(`#${id}`)?.showModal();
}

document.querySelector('[data-open-contents]')?.addEventListener('click', () => openDialog('contents-dialog'));
document.querySelector('[data-open-shortcuts]')?.addEventListener('click', () => openDialog('shortcuts-dialog'));
document.querySelectorAll<HTMLElement>('[data-close-dialog]').forEach((el) =>
  el.addEventListener('click', () => el.closest('dialog')?.close()),
);
document.querySelectorAll('dialog').forEach((d) =>
  d.addEventListener('click', (e) => {
    if (e.target === d) d.close(); // backdrop click
  }),
);

// ---------- Project details (front / back) ----------
document.querySelectorAll<HTMLButtonElement>('[data-expander]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls')!);
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    panel?.setAttribute('data-open', String(open));
  });
});

// ---------- Copy a link to a section ----------
const live = document.querySelector<HTMLElement>('[data-live]');
document.querySelectorAll<HTMLButtonElement>('[data-cell-link]').forEach((button) => {
  let timer = 0;
  button.addEventListener('click', async () => {
    const hash = `#${button.dataset.cellLink}`;
    window.clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}${hash}`);
      button.dataset.copied = '';
      if (live) live.textContent = 'Link to this section copied';
    } catch {
      history.replaceState(null, '', hash);
      if (live) live.textContent = 'Link to this section is in the address bar';
    }
    timer = window.setTimeout(() => {
      delete button.dataset.copied;
      if (live) live.textContent = '';
    }, 2000);
  });
});

// ---------- Hero stack: tilts toward the pointer (fine pointers, motion allowed) ----------
const stack = document.querySelector<HTMLElement>('[data-stack]');
const stackBody = stack?.querySelector<HTMLElement>('[data-stack-body]');
const hero = stack?.closest<HTMLElement>('[data-cell]');
if (
  stack &&
  stackBody &&
  hero &&
  matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  let frame = 0;
  let px = 0;
  let py = 0;
  const apply = () => {
    frame = 0;
    const r = stack.getBoundingClientRect();
    // -1..1 from the stack's centre, clamped so far-away pointers don't over-rotate.
    const x = Math.max(-1, Math.min(1, (px - (r.left + r.width / 2)) / (r.width * 1.5)));
    const y = Math.max(-1, Math.min(1, (py - (r.top + r.height / 2)) / (r.height * 1.5)));
    stackBody.style.setProperty('--tx', `${(x * 12).toFixed(2)}deg`);
    stackBody.style.setProperty('--ty', `${(-y * 9).toFixed(2)}deg`);
  };
  hero.addEventListener('pointermove', (e) => {
    px = e.clientX;
    py = e.clientY;
    if (!frame) frame = requestAnimationFrame(apply);
  });
  hero.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    frame = 0;
    stackBody.style.setProperty('--tx', '0deg');
    stackBody.style.setProperty('--ty', '0deg');
  });
}

// ---------- Copy email ----------
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
  const label = button.querySelector<HTMLElement>('[data-copy-label]');
  const status = button.parentElement?.querySelector<HTMLElement>('[data-copy-status]');
  let timer = 0;

  button.addEventListener('click', async () => {
    window.clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(button.dataset.copy!);
      if (label) label.textContent = 'Copied';
      if (status) status.textContent = 'Email address copied to clipboard';
    } catch {
      const email = button.parentElement?.querySelector('[data-email]');
      if (email) window.getSelection()?.selectAllChildren(email);
      if (status) status.textContent = 'Copy is blocked here. The address is selected; press Command or Control plus C.';
    }
    timer = window.setTimeout(() => {
      if (label) label.textContent = 'Copy';
      if (status) status.textContent = '';
    }, 2000);
  });
});
