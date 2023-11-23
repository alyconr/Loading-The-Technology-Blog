import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:9000/api/v1/posts${category}`
      );
      setPosts(res.data.posts);
    };
    fetchPosts();
  }, [category]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <Wrapper>
      {Array.isArray(posts) &&
        posts.map((post) => (
          <Post key={post.id}>
            <img src={`../upload/${post.image}`} alt={post.title} />
            <div className="Content">
              <PostLink to={`/singlepost/${post.id}`}>
                <h2>{post.title}</h2>
              </PostLink>
              <p>{getText(post.description)}</p>
              <Button>Read More</Button>
            </div>
          </Post>
        ))}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Post = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 50px auto 0;
  gap: 50px;

  .Content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    gap: 10px;
  }

  img {
    width: 40%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  .Content {
    position: relative;
    z-index: 1;
    flex: 3;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #070636;
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 20px;
`;
