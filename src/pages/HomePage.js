import React from 'react'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { toJS } from 'mobx'
import { observer, useLocalStore } from 'mobx-react'
import { Button } from 'antd'
import domToImage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { useStores } from 'src/stores'
import { getFrequency } from 'src/utils/getFrequency'
import Wordcloud from 'src/components/Wordcloud/Wordcloud'
import Controllers from 'src/components/Wordcloud/Controllers'
import './homePage.scss'

const HomePage = observer(() => {
  const store = useLocalStore(() => ({
    words: [{
      text: 'SAMPLE',
      value: 10
    }],
    setWords: (text) => store.words = text,
    textAreaWords: '',
    setTextAreaWords: (text) => store.textAreaWords = text,
    wordcloudOptions: {
      width: 600,
      height: 300,
      minFont: 12,
      maxFont: 24,
      spiral: 'archimedean'
    },
    setOptions: (options) => store.wordcloudOptions = options
  }))
  const { words, setWords, textAreaWords, setTextAreaWords, wordcloudOptions, setOptions } = store
  const { appStore: { options, cloudRef } } = useStores()
  
  const changeText = (e) => {
    const { value } = e.target
    setTextAreaWords(value)
  }
  const makeWordcloud = () => {
    const textObject = getFrequency(textAreaWords)
    setWords(textObject)
    setOptions(toJS(options))
  }
  const download = () => {
    domToImage.toBlob(cloudRef, {} )
              .then((blob) => {
                saveAs(blob, 'wordcloud.png')
              })
              .catch((error) => {
                console.error('oops, something went wrong!', error)
              })
  }

  return (
    <div className={'homePage'}>
      <h1>Word Cloud :)</h1>
      <Wordcloud words={words} options={wordcloudOptions}/>
      <Controllers />
      <textarea value={textAreaWords} onChange={changeText} placeholder={'분석하려는 텍스트를 넣어주세요'}/>
      <Button onClick={() => makeWordcloud()}>GENERATE !</Button>
      <Button onClick={() => download()} type={'primary'}>Download PNG !</Button>
    </div>
  )
})

export default HomePage
