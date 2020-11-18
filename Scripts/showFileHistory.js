const smerge = require("./smerge");

/**
 * Open the current file in blame mode in Sublime Merge.
 */
async function showFileHistory(editor) {
  const relativePath = nova.workspace.relativizePath(editor.document.path);
  await smerge(["log", relativePath]);
}

module.exports = showFileHistory;
