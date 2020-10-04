import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import './wordcloud.scss'

const Wordcloud = React.memo((props) => {
  const getCallback = callbackName => (word, event) => {
    const isActive = callbackName !== 'onWordMouseOut'
    const element = event.target
    element.setAttribute('background', 'white')
    element.setAttribute('font-size', isActive ? '300%' : '100%')
    element.setAttribute('text-decoration', isActive ? 'underline' : 'none')
  }
  return (
    <div className={'wordcloud-container'}>
      <ReactWordcloud words={props.words}
        options={{
          rotations: 3,
          rotationAngles: [0, 90],
        }}
        callbacks={{
          onWordClick: getCallback('onWordClick'),
          onWordMouseOut: getCallback('onWordMouseOut'),
          onWordMouseOver: getCallback('onWordMouseOver'),
        }}
      />
    </div>
  )
})

export default Wordcloud
