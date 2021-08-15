import { useState, useEffect } from 'preact/hooks';
import { Logo } from './logo'

export function App(props) {
  const [calls, setCalls] = useState(0)

  chrome.storage.onChanged.addListener(changes => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log('INSIDE STORAGE LISTENER', newValue)
      setCalls(newValue.calls);
    }
  });
  
  chrome.storage.sync.get(null, data => {
    console.log('STORAGE DATA', data);
    for (const url in data) {
      setCalls(data[url].calls)
    }
  });

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
      <h2>calls: {calls}</h2>
    </>
  )
}
