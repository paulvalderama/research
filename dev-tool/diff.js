const observableDiff = require("deep-diff").observableDiff;
const output = document.querySelector(".state-output");
let counter = 0;
// TODO: Remove this hard-coded state
let state = [];

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
    state.push(request.data.state);

    if (state.length > 1) {
      let lhs = state[state.length - 2];
      let rhs = state[state.length - 1];

      observableDiff(lhs, rhs, change => {
        switch (change.kind) {
          case "N":
            output.innerHTML += `<details> 
        <summary>${counter}: New entry</summary>
        <p>Added: ${change.path[change.path.length - 1]}: <em>${JSON.stringify(
              change.rhs
            )}</em> </p>
          </details>`;
            break;

          case "D":
            output.innerHTML += `<details> 
        <summary>${counter}: Deletion</summary>
        <p>Removed: <del>${
          change.path[change.path.length - 1]
        }: <em>${JSON.stringify(change.lhs)}</em></del>
            </p>
          </details>`;
            break;

          case "E":
            output.innerHTML += `<details>
          <summary>${counter}: Edit</summary>
          <p>Changed: <del>${
            change.path[change.path.length - 1]
          }: <em>${JSON.stringify(change.lhs)}</em></del> -> ${
              change.path[change.path.length - 1]
            }: <em>${JSON.stringify(change.rhs)}</em>
              </p>
            </details>`;
            break;
          case "A":
            // Don't output anything
            // output.innerHTML += `Change within array`;
            break;
        }
        // TODO: figure out why counter runs so many times (too many messages sent from TimeTravel.js?)
      });
    }
    counter += 1;
  }
});
