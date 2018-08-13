window.addEventListener("message", function(event) {
  if (event.source != window) return;
  // TODO: name this message something unique
  chrome.runtime.sendMessage({ type: "currentState", state: event.data });
});
