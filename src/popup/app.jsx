import { useState, useEffect } from 'preact/hooks';
import mockedData from '../mock.json'

export function App(props) {
  // const [storageData, setStorageData] = useState({})

  // chrome.storage.onChanged.addListener(changes => {
  //   console.log('CHANGESSS', changes)
  //   setStorageData(changes)
  // });

  // useEffect(() => {
  //   chrome.storage.local.get(null, data => {
  //     console.log('set data ', data)
  //     setStorageData(data)
  //   });
  // }, [])

  return (
    <>
      <h1>Popevent</h1>
      {Object.keys(storageData).map(key => (
        <div>
          <h2>{key}</h2>
          <h3>count: {storageData[key].length}</h3>
          <ul>
            {storageData[key].map((value) => (
              <li>{value.path}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
