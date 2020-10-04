import React from 'react'
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { Link, useHistory } from 'react-router-dom'
import { observer, useLocalStore } from 'mobx-react'
import { getFrequency } from 'src/utils/getFrequency'
import Wordcloud from 'src/components/Wordcloud/Wordcloud'
import './homePage.scss'

const HomePage = observer(() => {
  const store = useLocalStore(() => ({
    words: [{
      text: 'SAMPLE',
      value: 10
    }],
    setWords: (text) => store.words = text,
    textAreaWords: '',
    setTextAreaWords: (text) => store.textAreaWords = text
  }))
  
  const changeText = (e) => {
    const { value } = e.target
    store.setTextAreaWords(value)
  }
  const makeWordcloud = () => {
    const textObject = getFrequency(store.textAreaWords)
    store.setWords(textObject)
  }

  return (
    <div className={'homePage'}>
      <h1>Word Cloud</h1>
      <Wordcloud words={store.words}/>
      <textarea value={store.textAreaWords} onChange={changeText} />
      <button onClick={() => makeWordcloud()}>GENERATE !</button>
    </div>
  )
})

export default HomePage
