import React from 'react'
import { create } from 'mobx-persist'
import { Provider, observer, useLocalStore } from 'mobx-react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { stores } from 'stores'

import HomePage from './pages/HomePage'

const browserHistory = createBrowserHistory()
const hydrate = create()

const App = observer(() => {
  const store = useLocalStore(() => ({
    storeLoaded: false,
    setStoreLoaded: (load) => (store.storeLoaded = load),
  }))

  React.useEffect(() => {
    const load = async () => {
      await hydrate('userStore', stores.userStore).then(() => {
        store.setStoreLoaded(true)
      })
    }
    load()
  }, [])

  return (
    <Provider {...stores}>
      <Router history={browserHistory}>
        {store.storeLoaded ? (
          <Switch>
            <Route exact path={'/'} component={HomePage} />
          </Switch>
        ) : null}
      </Router>
    </Provider>
  )
})

export default App
