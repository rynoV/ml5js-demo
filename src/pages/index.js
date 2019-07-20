import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

import robinImage from '../../static/robin.png'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default function IndexPage() {
  const [ml5Loaded, setMl5Loaded]           = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const [results, setResults]               = useState()

  const robinImageRef = useRef()

  function handleScriptInject({ scriptTags }) {
    if (scriptTags) {
      const scriptTag  = scriptTags[0]
      scriptTag.onload = () => {
        setMl5Loaded(true)
      }
    }
  }

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

  return (
    <Layout>
      {/* Load the ml5js library. */}
      <Helmet
        script={[{ src: 'https://unpkg.com/ml5@0.3.1/dist/ml5.min.js' }]}
        // Helmet doesn't support `onload` in script objects so we have to
        // hack in our own
        onChangeClientState={(newState, addedTags) =>
          handleScriptInject(addedTags)
        }
      />
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
