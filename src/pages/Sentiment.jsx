import React, { useEffect, useState } from 'react'

import { Layout } from '../components/Layout'

export default function Sentiment() {
  const [ml5Loaded, setMl5Loaded] = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const [results, setResults] = useState()
  const [inputVal, setInputVal] = useState('')

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

        // console.log(ml5)
        // const sentiment = ml5.sentiment('moviereviews')
        //
        // const prediction = sentiment.predict('testing')

        // const prediction = await sentiment.predict('testing')

        // console.log(prediction)
        setLoadingResults(false)
      })()
    }
  }, [ml5Loaded])

  function handleInputChange(e) {
    setInputVal(e.target.value)
  }

  return (
    <Layout>
      <div>
        <input type='text' value={inputVal} onChange={handleInputChange} />
      </div>
    </Layout>
  )
}
