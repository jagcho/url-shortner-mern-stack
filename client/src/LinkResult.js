import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';


const LinkResult = ({ inputValue }) => {
  let longUrl = { longUrl: inputValue }
  const [shortenLink, setShortenLink] = useState('')
  const [copied, setCopied] = useState(false);



  const fetchData = async () => {


    const res = await fetch("/url/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(longUrl)
    });

    const data = await res.json()


    if (res.status === 400 || !data) {
      return alert(`${data.message}`)
    }

    else {
      setShortenLink(data.data.urlCode);
      // console.log(data.data.shortUrl)
      return alert(`${data.message}`)

    }

  }



  useEffect(() => {
    if (inputValue.length) {
      fetchData()
    }
  }, [inputValue])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer)
  }, [copied])


  //  console.log(shortenLink)

  return (
    <>
      {shortenLink && (
        <div className='result'>
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink}
            onCopy={() => setCopied(true)}

          >
            <button className={copied ? "copied" : ""} > Copy to Clipboard</button>
          </CopyToClipboard>

        </div>
      )}
    </>

  )
}

export default LinkResult