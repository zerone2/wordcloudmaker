import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'

export default class AppStore {
  @persist @observable appInfo = {}
  @observable options = {
    width: 600,
    height: 300,
    minFont: 12,
    maxFont: 24,
    spiral: 'archimedean'
  }
  @observable cloudRef
  
  @action
  changeOptions = (key, value) => {
    this.options[key] = value
  }
  
  @action
  setCloudRef = (ref) => {
    this.cloudRef = ref
  }
}
