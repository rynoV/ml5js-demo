import React, { useEffect, useRef, useState } from 'react'

import robinImage from '../../static/robin.png'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default function IndexPage() {
  const [ml5Loaded, setMl5Loaded]           = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const [results, setResults]               = useState()

  const robinImageRef = useRef()

  if (ml5Loaded && !loadingResults) {
    (async function() {
        setLoadingResults(true)
        const classifier = await ml5.imageClassifier('MobileNet')

        const results = await classifier.classify(robinImageRef.current)

        setResults(results)
        setLoadingResults(false)
      }
    )()
  }

  useEffect(() => {
    const script = document.createElement('script')

    script.src    = 'https://unpkg.com/ml5@0.3.1/dist/ml5.min.js'
    script.async  = true
    script.onload = () => {
      setMl5Loaded(true)
    }

    document.body.appendChild(script)
  }, [])

  return (
    <Layout>
      <SEO title='Home' />
      <h1>ML5 demo</h1>
      <img src={robinImage} alt='robin' ref={robinImageRef} />
      {loadingResults && <p>ML5 is guessing...</p>}
      {results &&
       <p>ML5 guess: {results[0].label} <br />ML5
         confidence: {results[0].confidence}</p>}
    </Layout>
  )
}
