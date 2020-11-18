const openRepository = require("./openRepository.js");
const showBlame = require("./showBlame.js");
const showFileHistory = require("./showFileHistory.js");

nova.commands.register("sublime-merge.openRepository", async () => {
  openRepository();
});

nova.commands.register("sublime-merge.blame", async (editor) => {
  await showBlame(editor);
});

nova.commands.register("sublime-merge.fileHistory", async (editor) => {
  await showFileHistory(editor);
});
