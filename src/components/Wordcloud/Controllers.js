import React from 'react'
import { observer } from 'mobx-react'
import { Slider, InputNumber, Input, Select } from 'antd'
import styled from 'styled-components'
import { useStores } from 'src/stores'
import './controllers.scss'

const StyledSlider = styled(Slider)`
  width: 65%;
  .ant-slider-rail {
    height: 8px;
  }
   &:hover {
    .ant-slider-track {
      background: #a03eff;
    }
  }
  .ant-slider-track {
    background: #a03eff;
    height: 8px;
  }
  .ant-slider-handle {
    border: solid 3px #a03eff;
    height: 20px;
    width: 20px;
  }
`

const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 36px !important;
    
    .ant-select-selection-item {
      line-height: 33px;
    }
  }
`

const Controllers = observer(() => {
  const { appStore } = useStores()
  const { options, changeOptions } = appStore
  const { width, height, maxWords, minFont, maxFont } = options
  
  return (
    <div className={'wordcloud-controller'}>
      <div className={'wordcloud-controller__row'}>
        <div className={'wordcloud-controller__row-width'} style={{marginRight: 20}}>
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
            style={{ border: '2px solid #cccccc', width: 80 }}
            value={width}
            onChange={(value) => changeOptions('width', value)}
          />
        </div>
        <div className={'wordcloud-controller__row-height'} style={{marginLeft: 20}}>
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
            style={{ border: '2px solid #cccccc', width: 80 }}
            value={height}
            onChange={(value) => changeOptions('height', value)}
          />
        </div>
      </div>
      <div className={'wordcloud-controller__row'}>
        <div className={'wordcloud-controller__row-spiral'}>
          <p>모양</p>
          <StyledSelect defaultValue={'archimedean'} onChange={value => changeOptions('spiral', value)} style={{height: 36, width: 150, textAlign: 'left'}}>
            <Select.Option value={'archimedean'}>아르키메데스형</Select.Option>
            <Select.Option value={'rectangular'}>직사각형</Select.Option>
          </StyledSelect>
        </div>
        <div className={'wordcloud-controller__row-maxWords'}>
          <p>최대 글자수</p>
          <Input placeholder="30" value={maxWords} onChange={(e) => {changeOptions('maxWords', e.target.value)}} style={{width: 80, border: '2px solid #cccccc'}}/>
          <em>(200개 이상으로 입력하시면<br/>활성화가 어려울 수 있습니다. )</em>
        </div>
        <div className={'wordcloud-controller__row-font'}>
          <p>최소 글자크기</p>
          <Input placeholder="10" value={minFont} suffix={'px'} onChange={(e) => {changeOptions('minFont', e.target.value)}} style={{width: 100, marginRight: 20, border: '2px solid #cccccc'}}/>
          <p>최대 글자크기</p>
          <Input placeholder="30" value={maxFont} suffix={'px'} onChange={(e) => {changeOptions('maxFont', e.target.value)}} style={{width: 100, border: '2px solid #cccccc'}}/>
        </div>
      </div>
    </div>
  )
})

export default Controllers
