import { useState, useEffect } from "preact/hooks"

export function App(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    chrome.storage.local.get(null, data => {
      console.log('storage data in popup', data)
      for (const url in data) {
        setData(curData => [...curData, `${url} - ${data[url].calls}`])
      }
    });
  }, [])

  // chrome.storage.onChanged.addListener(changes => {
  //   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  //     setData(curData => [...curData, `${key} - ${newValue.calls}`])
  //   }
  // });

  return (
    <>
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
      {data.map(each => (
        <div>{each}</div>
      ))}
    </>
  )
}
