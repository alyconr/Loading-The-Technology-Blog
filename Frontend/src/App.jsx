import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Singlepost from "./pages/Singlepost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const Layout = () => {
  
  return (
    
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
   
}


const Router = createBrowserRouter([

  {
    path: "/",
    element:  <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/singlepost/:id",
        element: <Singlepost />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  

])

function App() {

  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  )
}



export default App
