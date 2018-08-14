const observableDiff = require("deep-diff").observableDiff;
const output = document.querySelector(".state-output");
let counter = 0;

chrome.devtools.panels.create(
  "Apollo Time-Travel Debugger",
  "time_travel.png",
  "devtools.html",
  function(panel) {
    output.innerHTML += `<p>Apollo time-travel debugger</p>`;
  }
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg === "state_changed") {
    let lhs = request.data.state[0];
    let rhs = request.data.state[1];

    var entries = [];
    var additions = [];
    var edits = [];
    var deletions = [];
    observableDiff(lhs, rhs, change => {
      switch (change.kind) {
        case "N":
          additions.push(
            `<p>Added: ${
              change.path[change.path.length - 1]
            }: <em>${JSON.stringify(change.rhs)}</em> </p>`
          );
          break;

        case "D":
          deletions.push(`<p>Removed: <del>${
            change.path[change.path.length - 1]
          }: <em>${JSON.stringify(change.lhs)}</em></del>
            </p>`);
          break;

        case "E":
          edits.push(`<p>Changed: <del>${
            change.path[change.path.length - 1]
          }: <em>${JSON.stringify(change.lhs)}</em></del> -> ${
            change.path[change.path.length - 1]
          }: <em>${JSON.stringify(change.rhs)}</em>
              </p>`);
          break;
        case "A":
          // Don't output anything for the array case
          // output.innerHTML += `Change within array`;
          break;
      }
    });

    if (additions.length > 0)
      entries.push(`<dd><details>
      <summary>Additions</summary>
      ${additions.join("")}
    </details></dd>`);
    if (edits.length > 0)
      entries.push(`<dd><details>
      <summary>Edits</summary>
      ${edits.join("")}
    </details></dd>`);
    if (deletions.length > 0)
      entries.push(`<dd><details>
      <summary>Deletions</summary>
      ${deletions.join("")}
    </details></dd>`);
    // Write html output here
    const log = `<dl><details>
        <summary>${counter}</summary>
          <dt>${entries.join("")}</dt>
      </details></dl>`;
    console.log(log);
    output.innerHTML += log;
    counter += 1;
  }
});
