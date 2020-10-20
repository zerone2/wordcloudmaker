import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import ReactWordcloud from 'react-wordcloud'
import { useStores } from 'src/stores'
import './wordcloud.scss'

const Wordcloud = React.memo(observer((props) => {
  const { words, options } = props
  const { width, height, maxWords, minFont, maxFont, spiral, fontFamily } = options
  const { appStore: { setCloudRef }} = useStores()
  
  const getCallback = callbackName => (word, event) => {
    const isActive = callbackName !== 'onWordMouseOut'
    const element = event.target
    element.setAttribute('background', 'white')
    element.setAttribute('font-size', isActive ? '300%' : '100%')
    element.setAttribute('text-decoration', isActive ? 'underline' : 'none')
  }
  const cloudRef = useRef(null)
  if(cloudRef.current) setCloudRef(cloudRef.current.firstChild)
  
  return (
    <div className={'wordcloud-container'} ref={cloudRef} id={'check'}>
      <ReactWordcloud
        words={words}
        maxWords={maxWords}
        size={[width, height]}
        options={{
          rotations: 3,
          rotationAngles: [0, 90],
          fontSizes: [minFont, maxFont],
          spiral: spiral,
          fontFamily: fontFamily
        }}
        callbacks={{
          onWordClick: getCallback('onWordClick'),
          onWordMouseOut: getCallback('onWordMouseOut'),
          onWordMouseOver: getCallback('onWordMouseOver'),
        }}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      />
    </div>
  )
}))

export default Wordcloud
