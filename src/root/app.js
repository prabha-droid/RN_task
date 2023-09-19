import React from 'react'
import AppNavigator from '../navigation/appNavigator'
import { store } from '../store/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App

