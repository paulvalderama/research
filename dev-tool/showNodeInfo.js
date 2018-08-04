chrome.devtools.panels.create(
  "Apollo Time-Travel Debugger",
  "time_travel.png",
  "devtools.html",
  function(panel) {
    const output = document.querySelector(".analysis-output");
    output.innerHTML = `<p>Chrome tab id: ${
      chrome.devtools.inspectedWindow.tabId
    }</p>`;
  }
);
