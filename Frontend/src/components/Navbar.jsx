import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavBar>
      <div className="container">
        <Logo>
          <img src="logo.png" alt="logo" />
        </Logo>
        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/?category=Javascript">Javascript</MenuItem>
          <MenuItem to="/?category=CSS">CSS</MenuItem>
          <MenuItem to="/?category=React">React</MenuItem>
          <MenuItem to="/?category=Node">Node</MenuItem>
          <MenuItem to="/?category=Python">Python</MenuItem>
          <MenuItem to="/?category=Docker">Docker</MenuItem>
          <Span>John</Span>
          <Span>Logout</Span>
          <Span>
            <Write to="/write">Write</Write>
          </Span>
        </Menu>
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
`;

const MenuItem = styled(Link)`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: 500;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
    text-decoration: underline;
    cursor: pointer;
    color: #12c4c1;
  }
`;

const Span = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: 500;
  margin-left: 20px;
  background-color: #1dbf73;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }
`;

const Write = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
`;
