const observableDiff = require("deep-diff").observableDiff;
const output = document.querySelector(".state-output");
let counter = 0;
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
    state.push(request.data.state[0], request.data.state[1]);
    let htmlObj = {};

    if (state.length > 1) {
      let lhs = state[state.length - 2];
      let rhs = state[state.length - 1];
      var prefix = "";
      var middle = "";
      var suffix = "";

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
            prefix += `<details>
          <summary>${counter}: Edit</summary>`;

            middle += `<p>Changed: <del>${
              change.path[change.path.length - 1]
            }: <em>${JSON.stringify(change.lhs)}</em></del> -> ${
              change.path[change.path.length - 1]
            }: <em>${JSON.stringify(change.rhs)}</em>
              </p>`;

            suffix += `</details>`;

            break;
          case "A":
            // Don't output anything for the array case
            // output.innerHTML += `Change within array`;
            break;
        }
      });
    }
    // write output here
    const wholeThing = `${prefix} ${middle} ${suffix}`;
    if (counter > 0 && middle.length > 1) output.innerHTML += wholeThing;
    counter += 1;
  }
});
