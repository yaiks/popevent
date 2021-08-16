/**
 * this file should contain the browser's event listeners
 * should be loaded when nedeed and unloaded afterwards
 */

 const filterUrls = [
  '*://*.api.segment.io/*',
  '*://*.google-analytics.com/*'
]

// chrome.webNavigation.onCommitted.addListener((details) => {
//   if (["reload"].includes(details.transitionType)) {
//     console.log('ON PAGE RELOAD, LOAD OR REFRESH')
//     chrome.storage.local.clear(function() {
//       console.log('cleared storage sucessfully!')
//     })
//   }
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('LISTENING TO MESSAGE FROM CONTENT SCRIPT')

  if (request.reload) {
    chrome.storage.local.clear(function() {
      console.log('cleared storage sucessfully!')
    })
  }
})

chrome.webRequest.onBeforeRequest.addListener(function ({ method, requestBody, url }) {
  const urlObject = new URL(url);
  const hostname = urlObject.hostname;
  const path = urlObject.pathname;
  const query = urlObject.search;

  // if method GET and gif or img for pixel
  // then parse request and send message to popup to show pixels

  if (method === "POST") {
    const body = requestBody.formData ? request.formData : new TextDecoder().decode(requestBody.raw[0].bytes);

    chrome.storage.local.get(hostname, function(data = {}) {
      const hasPropertyInStore = data.hasOwnProperty(hostname)

      if (hasPropertyInStore) {
        const newData = [ ...data[hostname], { path, query, body } ]
        chrome.storage.local.set({ [hostname]: newData }, () => console.log(`updated data for ${hostname}`))
      } else {
        const firstData = { path, query, body };
        chrome.storage.local.set({ [hostname]: [firstData]}, () => console.log(`set new data for ${hostname}`))
      }
    })

    // how identify tracking requests? (make a huge glossary?)

    // if domain matches glossary (analytics, segment, gtm...)
    // parse data for each domain, to result in the following structure

    /**
     * {
     *    "segment": [
     *      { path: "/", query: [], body: [] },
     *      { path: "/track", query: [], body: [] },
     *    ],
     *    "analytics": [
     *      { path: "/", query: [], body: [] }
     *    ]
     * }
     * 
     */

    // only in firefox 
    // https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop
  }
}, {urls: filterUrls, types: ['xmlhttprequest']}, ['requestBody']);

// chrome.action.onClicked.addListener((tab) => {
//   console.log('CLICKEEDD');
// });

/**
 * What to catch:
 * 1°
 * Tracking scripts (GA, GTM, Segment, etc)
 * Cookies (first party and third party cookies)
 * 2°
 * pixels (GET imgs and gifs)
 * fingerprints
 * 3°
 * monitor dataLayer 
 */

