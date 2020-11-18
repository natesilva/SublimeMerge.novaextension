const smerge = require("./smerge");

/**
 * Open the current file in blame mode in Sublime Merge.
 */
async function showBlame(editor) {
  const relativePath = nova.workspace.relativizePath(editor.document.path);
  await smerge(["blame", relativePath]);
}

module.exports = showBlame;
