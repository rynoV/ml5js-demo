import React, { useEffect, useRef, useState } from 'react'

import robinImage from '../../static/robin.png'

export default function IndexPage() {
  const [ml5Loaded, setMl5Loaded] = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const [results, setResults] = useState()
  const [imageURL, setImageURL] = useState(robinImage)

  const imageRef = useRef()

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://unpkg.com/ml5@0.3.1/dist/ml5.min.js'
    script.async = true
    script.onload = () => {
      setMl5Loaded(true)
    }

    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (ml5Loaded && !loadingResults) {
      ;(async function() {
        setLoadingResults(true)

        const classifier = await ml5.imageClassifier('MobileNet')

        const results = await classifier.classify(imageRef.current)

        setResults(results)
        setLoadingResults(false)
      })()
    }
  }, [ml5Loaded, imageURL])

  async function setNewImage() {
    const { url } = await fetch('https://picsum.photos/300/300')

    setImageURL(url)
  }

  return (
    <>
      <h1>ML5 demo</h1>
      <img src={imageURL} alt='random' ref={imageRef} crossOrigin='Anonymous' />
      {loadingResults && <p>ML5 is guessing...</p>}
      {results &&
        !loadingResults &&
        results.map((result, index) => {
          return (
            <p key={result.label}>
              ML5 guess #{index}: {result.label} <br />
              ML5 confidence #{index}: {result.confidence}
            </p>
          )
        })}
      <button onClick={setNewImage}>Get random image</button>
    </>
  )
}
