/**
 * Secure Google Drive Noteful Sync with Selective Privacy Filtering
 * 
 * Privacy Control Features:
 * 1. Title Tag Filter: Only syncs notes containing '[Public]', '#public', or 'Public' in title (optional).
 * 2. Exclude List: Automatically hides any note/folder named 'Personal', 'Private', 'Journal', or 'Drafts'.
 * 3. Folder Scope: Only syncs from a dedicated 'Public Notes' subfolder if specified.
 */

export async function fetchGoogleDriveNotes(folderId, apiKey, options = {}) {
  const {
    filterTag = '', // e.g. '[Public]' or '#public' or leave empty if using dedicated folder
    excludeKeywords = ['personal', 'private', 'journal', 'draft'],
    allowedCategories = [] // e.g. ['Gen AI', 'Deep Learning', 'MLops', 'System Design']
  } = options;

  if (!folderId || !apiKey) {
    return null;
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,modifiedTime,webViewLink,webContentLink)&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google Drive API error: ${res.status}`);

    const data = await res.json();
    if (!data.files) return null;

    // 1. Filter for PDF files
    let pdfFiles = data.files.filter((file) => file.name.endsWith('.pdf'));

    // 2. Exclude private keywords
    pdfFiles = pdfFiles.filter((file) => {
      const lowerName = file.name.toLowerCase();
      return !excludeKeywords.some((kw) => lowerName.includes(kw));
    });

    // 3. Selective Tag Filter (if specified)
    if (filterTag) {
      pdfFiles = pdfFiles.filter((file) => file.name.toLowerCase().includes(filterTag.toLowerCase()));
    }

    return pdfFiles.map((file) => {
      // Clean up title (remove tag if present)
      let title = file.name.replace('.pdf', '');
      if (filterTag) {
        title = title.replace(new RegExp(filterTag, 'gi'), '').trim();
      }

      return {
        id: `gdrive-${file.id}`,
        title: title,
        category: 'Noteful Public Note',
        notebookName: file.name,
        description: `Synced Noteful App notebook: ${title}.`,
        date: new Date(file.modifiedTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        tags: ['Noteful Public Export', 'Google Drive'],
        fileUrl: `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(file.webContentLink)}`,
        downloadUrl: file.webContentLink,
        lastModified: new Date(file.modifiedTime).getTime()
      };
    });
  } catch (err) {
    console.error('Failed to fetch from Google Drive API:', err);
    return null;
  }
}
