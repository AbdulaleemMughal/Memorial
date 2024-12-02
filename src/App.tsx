import { Memorial } from "./Pages/Memorial"
import { Provider } from "react-redux"
import { appStore } from "./Store/appstore"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LivePage } from "./LiveDemo/LivePage";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Memorial />
    },
    {
      path: `/edit-memorial`,
      element: <LivePage />
    }
  ]);

  return (  
    <>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
    </>
  )
}

export default App;
