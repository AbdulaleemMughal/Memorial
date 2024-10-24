import { Memorial } from "./Pages/Memorial"
import { Provider } from "react-redux"
import { appStore } from "./Store/appstore"

function App() {

  return (  
    <>
    <Provider store={appStore}>
      <Memorial />
      </Provider>
    </>
  )
}

export default App;
