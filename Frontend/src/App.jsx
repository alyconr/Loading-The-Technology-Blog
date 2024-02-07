import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Singlepost from "./pages/Singlepost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Hero from "./components/Hero";
import Profile from "./pages/Profile";
import Userposts from "./pages/Userposts";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/forgotPassword";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const category = useLocation().search;

  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <Navbar />
      {isHome && !category && <Hero />}
      <Outlet />
      <Footer />
    </>
  );
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/singlepost/:id",
        element: <Singlepost />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/profile/:username/posts",
        element: <Userposts />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  }
]);

function App() {
  return (
    <>
      <Container>
        <RouterProvider router={Router} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
