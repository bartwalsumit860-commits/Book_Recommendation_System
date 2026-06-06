import React from 'react'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Recomendation from './components/Recomendation'
import { createBrowserRouter, RouterProvider } from "react-router-dom";



const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/recommandation",
    element:<Recomendation/>
  }
])

const App = () => {
  return (
    <div>
       <RouterProvider router={appRouter} />;
    </div>
  )
}

export default App