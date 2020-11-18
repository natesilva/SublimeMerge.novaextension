const smerge = require("./smerge");

/**
 * Show the current file’s history in Sublime Merge.
 */
async function showFileHistory(editor) {
  const relativePath = nova.workspace.relativizePath(editor.document.path);
  await smerge(["log", relativePath]);
}

module.exports = showFileHistory;
