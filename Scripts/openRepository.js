/**
 * Open the current project’s Git repository in Sublime Merge.
 *
 * This does not use the smerge command, so it works if the user has not configured that.
 */
function openRepository() {
  if (!nova.workspace.path) {
    nova.workspace.showInformativeMessage(
      nova.localize("This workspace has no path for Sublime Merge to open.")
    );
    return;
  }

  var process = new Process("/usr/bin/open", {
    args: ["-a", "Sublime Merge", nova.workspace.path],
  });

  var lines = [];

  process.onStderr(function (data) {
    if (data) {
      lines.push(data);
    }
  });

  process.onDidExit(function (status) {
    if (status != 0) {
      nova.workspace.showInformativeMessage(
        nova.localize("Error launching Sublime Merge:") +
          "\n\n" +
          lines.join("")
      );
    }
  });

  process.start();
}

module.exports = openRepository;
