chrome.runtime.sendMessage({ reload: true }, function(response) {
  console.log("message sent to extension", response.farewall)
})