const which = require("./which.js");

/**
 * Run the smerge command with the given arguments.
 */
async function smerge(args) {
  const smergePath = await which("smerge");

  if (!smergePath) {
    showSmergeInstructions();
    return;
  }

  return new Promise((resolve, reject) => {
    var process = new Process(smergePath, {
      args,
      cwd: nova.workspace.path,
    });

    var errLines = [];

    process.onStdout(function (data) {
      if (data) {
        errLines.push(data.trim());
      }
    });

    process.onStderr(function (data) {
      if (data) {
        errLines.push(data.trim());
      }
    });

    process.onDidExit(function (status) {
      if (status !== 0) {
        const message = "Could not run the smerge utility.";
        nova.workspace.showInformativeMessage(
          nova.localize(message + "\n\n" + errLines.join("\n"))
        );
        reject(new Error(message));
      } else {
        resolve();
      }
    });

    process.start();
  });
}

/**
 * Show instructions for setting up the smerge command if it’s not found.
 */
function showSmergeInstructions() {
  const instructionsUrl = "https://www.sublimemerge.com/docs/command_line";

  const lines = [
    "To use this command, you must install the Sublime Merge “smerge” tool.",
    "",
    "Please install it by following the instructions at:",
    `${instructionsUrl}`,
  ];
  nova.workspace.showActionPanel(
    nova.localize(lines.join("\n")),
    {
      buttons: ["Go to instructions", "Close"],
    },
    (index) => {
      if (index === 0) {
        nova.openURL(instructionsUrl);
      }
    }
  );
}

module.exports = smerge;
