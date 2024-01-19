import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Dropdown from "react-bootstrap/Dropdown";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import axios from "axios";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [draftId, setDraftId] = useState("");
  const [draftPost, setDraftPost] = useState({});
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const fecthDraftPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/v1/draftposts`);
      if (res.data.posts.length > 0) {
        setDraftPost(res.data.posts[0]);
        const newDraftId = res.data.posts[0].id;
        setDraftId(newDraftId);
      } else {
        // Set default values or handle accordingly
        setDraftPost({ id: 1 }); // Assuming 'id' is the property you want to set
        setDraftId(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <NavBar>
      <div className="container">
        <Link className="link" to="/">
          <Logo>
            <img src={logo} alt={logo} />
          </Logo>
        </Link>

        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Web Development
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-secondary">
              <Dropdown.Item>
                <MenuItem to="/?category=Javascript">Javascript</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=CSS">CSS</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=React">React</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=Node">Node</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=Python">Python</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              DevOps
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-secondary">
              <Dropdown.Item>
                <MenuItem to="/?category=Docker">Docker</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=CSS">CSS</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=React">React</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=Node">Node</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=Python">Python</MenuItem>
              </Dropdown.Item>
              <Dropdown.Item>
                <MenuItem to="/?category=Docker">Docker</MenuItem>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {currentUser ? (
            <>
              <Dropdown>
                <Dropdown.Toggle
                  className="link-profile"
                  variant="success"
                  id="dropdown-basic"
                >
                  {currentUser?.user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Profile to={`/profile/${currentUser?.user.username}`}>
                    <Dropdown.Item href="#/action-1" onClick={closeMobileMenu}>
                      <CgProfile size={20} /> Profile
                    </Dropdown.Item>
                  </Profile>
                  <Dropdown.Item onClick={handleLogout}>
                    <RiLogoutCircleRLine /> Logout
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <IoSettingsOutline /> Settings
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Write
                state={draftPost}
                onClick={fecthDraftPosts}
                to={`/write?draftId=${draftId}`}
              >
                Write <img className="write-img" src="../write.png" alt="" />
              </Write>
            </>
          ) : (
            <Login to="/login">Login</Login>
          )}
        </Menu>
        <MobileMenuIcon onClick={toggleMobileMenu}>&#9776;</MobileMenuIcon>
        {isMobileMenuOpen && (
          <MobileMenu>
            <MenuItem to="/" onClick={closeMobileMenu}>
              Home
            </MenuItem>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Web Development
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-secondary">
                <Dropdown.Item>
                  <MenuItem
                    to="/?category=Javascript"
                    onClick={closeMobileMenu}
                  >
                    Javascript
                  </MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=CSS" onClick={closeMobileMenu}>
                    CSS
                  </MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=React" onClick={closeMobileMenu}>
                    React
                  </MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=Node" onClick={closeMobileMenu}>
                    Node
                  </MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=Python" onClick={closeMobileMenu}>
                    Python
                  </MenuItem>
                </Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                DevOps
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-secondary">
                <Dropdown.Item>
                  <MenuItem to="/?category=Docker" onClick={closeMobileMenu}>
                    Docker
                  </MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=CSS">CSS</MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=React">React</MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=Node">Node</MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=Python">Python</MenuItem>
                </Dropdown.Item>
                <Dropdown.Item>
                  <MenuItem to="/?category=Docker">Docker</MenuItem>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {currentUser ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    className="link-profile"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {currentUser?.user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Profile to={`/profile/${currentUser?.user.username}`}>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={closeMobileMenu}
                      >
                        <CgProfile size={20} /> Profile
                      </Dropdown.Item>
                    </Profile>

                    <Dropdown.Item onClick={logout}>
                      <RiLogoutCircleRLine /> Logout
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      <IoSettingsOutline /> Settings
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Span>
                  <Write to="/write" onClick={closeMobileMenu}>
                    Write{" "}
                    <img className="write-img" src="../write.png" alt="" />
                  </Write>
                </Span>
              </>
            ) : (
              <Span>
                <Link to="/login">Login</Link>
              </Span>
            )}
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
  .link-profile {
    background: linear-gradient(
      90deg,
      rgba(131, 58, 180, 1) 0%,
      rgba(253, 29, 29, 1) 50%,
      rgba(252, 176, 69, 1) 100%
    );
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
  justify-content: flex-end;
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

  @media (max-width: 820px) {
    display: block; /* Show the mobile menu icon on small screens */
  }
`;

const MobileMenu = styled.div`
  display: none; /* Hide the mobile menu on larger screens */

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #342e2e;
    gap: 10px;
  }

  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #342e2e;
    gap: 10px;
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
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 30%;
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
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(165, 108, 108, 1) 100%
  );
  padding: 10px;
  border-radius: 50px;
  transition: all 0.3s ease;
  width: 10%;
  text-align: center;

  .write-img {
    width: 25px;
    height: 25px;
  }
`;

const Profile = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: white;
  border-radius: 50px;
  transition: all 0.3s ease;
  width: 10%;
`;

const Login = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bolder;
  color: black;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(225, 253, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 15%;
  text-align: center;
`;
