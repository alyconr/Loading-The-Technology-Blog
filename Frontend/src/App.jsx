import { createBrowserRouter, RouterProvider, Outlet, useLocation   } from "react-router-dom";
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

const Layout = () => {

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <GlobalStyles />
      <Navbar />
      { isHome && <Hero />}
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
