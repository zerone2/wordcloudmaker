import React from 'react'
import { observer } from 'mobx-react'
import { Slider, InputNumber, Input, Select } from 'antd'
import styled from 'styled-components'
import { useStores } from 'src/stores'
import './controllers.scss'

const StyledSlider = styled(Slider)`
  width: 70%;
`

const Controllers = observer(() => {
  const { appStore } = useStores()
  const { options, changeOptions } = appStore
  const { width, height, maxWords, minFont, maxFont } = options
  
  return (
    <div className={'wordcloud-controller'}>
      <div className={'wordcloud-controller__width'}>
        <p>넓이</p>
        <StyledSlider
          min={300}
          max={1000}
          step={10}
          onChange={(value) => changeOptions('width', value)}
          value={typeof width === 'number' ? width : 0}
        />
        <InputNumber
          min={300}
          max={1000}
          style={{ margin: '0 16px' }}
          value={width}
          onChange={(value) => changeOptions('width', value)}
        />
      </div>
      <div className={'wordcloud-controller__height'}>
        <p>높이</p>
        <StyledSlider
          min={300}
          max={550}
          step={10}
          onChange={(value) => changeOptions('height', value)}
          value={typeof height === 'number' ? height : 0}
        />
        <InputNumber
          min={300}
          max={550}
          style={{ margin: '0 16px' }}
          value={height}
          onChange={(value) => changeOptions('height', value)}
        />
      </div>
      <div className={'wordcloud-controller__maxWords inputRow'}>
        <p>최대 글자수</p>
        <Input placeholder="30" value={maxWords} onChange={(e) => {changeOptions('maxWords', e.target.value)}} style={{width: 150}}/>
        <em>(200개 이상으로 입력하시면 브라우저가 고통받을 수 있습니다)</em>
      </div>
      <div className={'wordcloud-controller__font inputRow'}>
        <p>최소 글자크기</p>
        <Input placeholder="10" value={minFont} suffix={'px'} onChange={(e) => {changeOptions('minFont', e.target.value)}} style={{width: 150, marginRight: 77}}/>
        <p>최대 글자크기</p>
        <Input placeholder="30" value={maxFont} suffix={'px'} onChange={(e) => {changeOptions('maxFont', e.target.value)}} style={{width: 150}}/>
      </div>
      <div className={'wordcloud-controller__spiral inputRow'}>
        <p>모양</p>
        <Select defaultValue={'archimedean'} onChange={value => changeOptions('spiral', value)}>
          <Select.Option value={'archimedean'}>아르키메데스형</Select.Option>
          <Select.Option value={'rectangular'}>직사각형</Select.Option>
        </Select>
      </div>
    </div>
  )
})

export default Controllers
