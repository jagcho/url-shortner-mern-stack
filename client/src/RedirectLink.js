import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';


const RedirectLink = ({ inputValue1 }) => {
  let params = inputValue1

  const [urlLink, setUrlLink] = useState('')
  const [copied, setCopied] = useState(false);



  const fetchData1 = async () => {
    const res = await fetch(`http://localhost:3000/${params}`);
    const data = await res.json()
    //console.log(data.data)




    if (res.status === 400 || !data) {
      return alert(`${data.message}`)
    }
    else {
      setUrlLink(data.data);
    }

  }

  useEffect(() => {
    if (inputValue1) {

      fetchData1()
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <>
      {urlLink && (
        <div className='result'>

          <p>{urlLink}</p>

          <a href={urlLink}> <button>Go</button></a>

        </div>
      )}
    </>

  )
}

export default RedirectLink