// Code cells only ever show real source: a named `// #region <name>` block from a file in this repo.
export function region(source: string, name: string): string {
  const start = source.indexOf(`// #region ${name}`);
  const end = source.indexOf(`// #endregion ${name}`);
  if (start === -1 || end === -1) throw new Error(`region "${name}" not found`);
  const body = source.slice(source.indexOf('\n', start) + 1, end).replace(/\s+$/, '');
  const lines = body.split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(indent)).join('\n');
}
