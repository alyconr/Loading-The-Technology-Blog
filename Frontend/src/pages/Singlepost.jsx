import styled from "styled-components";
import { BsFillTrashFill } from "@react-icons/all-files/bs/BsFillTrashFill";
import { FcEditImage } from "@react-icons/all-files/fc/FcEditImage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuLeft from "../components/Menuside";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Singlepost = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/posts/${postId}`
        );
        setPost(res.data.post);
      } catch (err) {
        console.log(err);
      }
    };

    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <Wrapper>
      <Post>
        <img className="postImg" src={`../upload/${post.image}`} alt="" />
        <div className="user">
          {post.userImage && (
            <img className="userImg" src={post.userImage} alt="" />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.createdAt).fromNow()}</p>
          </div>
          {currentUser &&
            currentUser.user &&
            currentUser.user.username === post.username && (
              <div className="Actions">
                <Link to={`/write?edit=${postId}`} state={post}>
                  <FcEditImage size={25} />
                </Link>
                <Link to={`/singlepost/${postId}`}>
                  <BsFillTrashFill
                    onClick={handleDelete}
                    color={"#6A072D"}
                    size={25}
                  />
                </Link>
              </div>
            )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.description)}
      </Post>
      <MenuSide>
        <MenuLeft category={post.category} />
      </MenuSide>
    </Wrapper>
  );
};

export default Singlepost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Post = styled.div`
  flex: 5;
  margin: 0 30px;

  .postImg {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    margin: 30px 0;
  }

  .user {
    display: flex;
    align-items: center;
    margin: -10px 0;

    .userImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
    }

    p {
      font-size: 14px;
      color: #555;
    }
  }

  .Actions {
    padding: 10px;
    display: flex;
    gap: 10px;
  }

  h1 {
    margin: 20px 0;
    font-size: 30px;
  }

  p {
    line-height: 25px;
    font-size: 17px;
    color: #333;
    text-align: justify;
  }
`;

const MenuSide = styled.div`
  flex: 3;
`;
