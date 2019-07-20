import React, { useEffect, useRef, useState } from 'react'

import robinImage from '../../static/robin.png'

import styles from './index.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.title}>ML5 demo</h1>
      <div className={styles.main}>
        <img
          className={styles.image}
          src={imageURL}
          alt='random'
          ref={imageRef}
          crossOrigin='Anonymous'
        />
        <div className={styles.result}>
          {loadingResults && (
            <span
              className={styles.thinkingEmoji}
              role='img'
              aria-label='Thinking emoji'
            >
              🤔
            </span>
          )}
          {results &&
            !loadingResults &&
            results.map((result, index) => {
              return (
                <p key={result.label}>
                  <label>
                    Guess #{index}: <br />
                    <span>{result.label}</span>
                  </label>
                  <label>
                    Confidence #{index}: <br />
                    <span>{Math.round(result.confidence * 100)}%</span>
                  </label>
                </p>
              )
            })}
        </div>
      </div>
      <button className={styles.button} onClick={setNewImage}>
        Get random image
      </button>
    </div>
  )
}
