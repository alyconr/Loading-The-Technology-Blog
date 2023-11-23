import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <NavBar>
      <div className="container">
      <Link className="link" to="/"><Logo>
          <img src="logo.png" alt="logo" />
        </Logo></Link>
        
        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/?category=Javascript">Javascript</MenuItem>
          <MenuItem to="/?category=CSS">CSS</MenuItem>
          <MenuItem to="/?category=React">React</MenuItem>
          <MenuItem to="/?category=Node">Node</MenuItem>
          <MenuItem to="/?category=Python">Python</MenuItem>
          <MenuItem to="/?category=Docker">Docker</MenuItem>
          {currentUser ? (
            <>
              <Write>{currentUser?.user.username}</Write>
              <Write onClick={logout}>Logout</Write>
            </>
          ) : (
         
              <Login className="link" to="/login">
                Login
              </Login>
            
          )}
         
            <Write to="/write">Write</Write>
          
        </Menu>
        <MobileMenuIcon onClick={toggleMobileMenu}>&#9776;</MobileMenuIcon>
        {isMobileMenuOpen && (
          <MobileMenu>
            <MenuItem to="/" onClick={closeMobileMenu}>
              Home
            </MenuItem>
            <MenuItem to="/?category=Javascript" onClick={closeMobileMenu}>
              Javascript
            </MenuItem>
            <MenuItem to="/?category=CSS" onClick={closeMobileMenu}>
              CSS
            </MenuItem>
            <MenuItem to="/?category=React" onClick={closeMobileMenu}>
              React
            </MenuItem>
            <MenuItem to="/?category=Node" onClick={closeMobileMenu}>
              Node
            </MenuItem>
            <MenuItem to="/?category=Python" onClick={closeMobileMenu}>
              Python
            </MenuItem>
            <MenuItem to="/?category=Docker" onClick={closeMobileMenu}>
              Docker
            </MenuItem>
            {currentUser ? (
              <>
                <Span>{currentUser?.user.username}</Span>
                <Span onClick={logout}>Logout</Span>
              </>
            ) : (
              <Span>
                <Link className="link" to="/login">
                  Login
                </Link>
              </Span>
            )}
            <Span>
              <Write to="/write" onClick={closeMobileMenu}>
                Write
              </Write>
            </Span>
          </MobileMenu>
        )}
      </div>
    </NavBar>
  );
};

export default Navbar;

const NavBar = styled.div`
  width: 100%;
  height: 70px;
  background-color: #342e2e;
  position: sticky;
  top: 0;
  z-index: 999;
  .container {
    padding: 0px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`;

const Logo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  img {
    height: 200px;
    width: 250px;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  @media (max-width: 768px) {
    display: none; /* Hide the regular menu on small screens */
  }

  @media (max-width: 820px) {
    display: none; /* Hide the regular menu on small screens */
  }
`;

const MobileMenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: white;
  display: none; /* Hide the mobile menu icon on larger screens */

  @media (max-width: 768px) {
    display: block; /* Show the mobile menu icon on small screens */
  }

  @media (max-width: 820px) {
    display: block; /* Show the mobile menu icon on small screens */
  }
`;

const MobileMenu = styled.div`
  display: none; /* Hide the mobile menu on larger screens */

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #342e2e;
  }

  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #342e2e;
  }
`;

const MenuItem = styled(Link)`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: 500;
  text-align: center;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
    text-decoration: underline;
    cursor: pointer;
    color: #12c4c1;
  }

  @media (max-width: 365px) {
    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease;
      text-decoration: underline;
      cursor: pointer;
      color: #12c4c1;
    }

    @media (max-width: 768px) {
      &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease;
        text-decoration: underline;
        cursor: pointer;
        color: #12c4c1;
      }
    }

    @media (max-width: 820px) {
      &:hover {
        transform: scale(1.1);
        transition: all 0.3s ease;
        text-decoration: underline;
        cursor: pointer;
        color: #12c4c1;
      }
    }
  }
`;

const Span = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: 500;
  margin: 10px auto;
  background-color: #1dbf73;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 25%;
  text-align: center;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .link {
    text-decoration: none;
    color: white;
  }
`;

const Write = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #1dbf73;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 15%;
  text-align: center;
`;

const Login = styled(Link)`
font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #1dbf73;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 15%;
  text-align: center;
`;
