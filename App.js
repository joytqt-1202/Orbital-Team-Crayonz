import React from "react"
import { Provider } from "react-redux"
// import 'react-native-gesture-handler'
import { store } from "./src/store/store"
import Cam from "./src/screens/main-camera"
import Navigation from "./src/navigation"


export default function App() {
  
  return (
        <Provider store={store}>
          <Navigation />
        </Provider>
    )
  }

