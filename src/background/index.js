/**
 * this file should contain the browser's event listeners
 * should be loaded when nedeed and unloaded afterwards
 */

 const filterUrls = [
  '*://*.api.segment.io/*',
  '*://*.google-analytics.com/*'
]

const glossary = {
  'api.segment.io': {
    calls: 1
  },
  'google-analytics.com': {
    calls: 1
  }
};

// chrome.webNavigation.onCommitted.addListener((details) => {
//   if (["reload"].includes(details.transitionType)) {
//     console.log('ON PAGE RELOAD, LOAD OR REFRESH')
//     chrome.storage.sync.clear(function() {
//       console.log('cleared storage sucessfully!')
//     })
//   }
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('LISTENING TO MESSAGE FROM CONTENT SCRIPT')

  if (request.reload) {
    chrome.storage.sync.clear(function() {
      console.log('cleared storage sucessfully!')
    })
  }
})

chrome.webRequest.onBeforeRequest.addListener(function ({ method, requestBody, url }) {
  // get url hostname
  const urlObject = new URL(url);
  const hostname = urlObject.hostname;

  // if method GET and gif or img for pixel
  // then parse request and send message to popup to show pixels

  if (method === "POST") {
    // var string = new TextDecoder().decode(requestBody.raw[0].bytes);
    // console.log('requestBody.formData', requestBody.formData);
    // console.log('\n');
    // console.log('string', string);

    console.log('segment POST request incoming!')

    chrome.storage.sync.get(hostname, function(data) {
      console.log('current storage', data)

      if (data[hostname]) {
        chrome.storage.sync.set({ [hostname]: { ...data[hostname], calls: data[hostname].calls + 1 }}, function() {
          console.log(`successfuly updated data for ${hostname}`);
        })
      } else {
        chrome.storage.sync.set({ [hostname]: glossary[hostname]}, function() {
          console.log(`successfuly set new data for ${hostname}`);
        })
      }
    })

    // how identify tracking requests? (make a huge glossary?)

    // if domain matches glossary (analytics, segment, gtm...)
    // parse data for each domain, to result in the following structure
    
    /**
     * [
     *  { 
     *    name: "google-analytics",
     *    calls: [
     *      { path: "/track", query: [], body: [] }
     *    ]
     *  },
     *  {
     *    name: "segment",
     *    calls: [...]
     *  }
     * ]
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

