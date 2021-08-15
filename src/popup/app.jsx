import { Logo } from './logo'

export function App(props) {
  // chrome.storage.onChanged.addListener(changes => {
  //   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  //     app.innerHTML = `
  //       <p>${key} - ${newValue.calls}</p>
  //     `
  //   }
  // });
  
  // chrome.storage.local.get(null, data => {
  //   console.log('storage data in popup', data)
  //   for (const url in data) {
  //     app.innerHTML = `
  //       <p>${url} - ${data[url].calls}</p>
  //     `
  //   }
  // });

  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          class="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Preact
        </a>
      </p>
    </>
  )
}
