import styled from "styled-components";
import { Link } from "react-router-dom";
const Home = () => {
  const posts = [
    {
      id: 1,
      title: "ReactJs",
      description:
        "ReactJs is a free and open-source front-end JavaScript library for building user interfaces based on components",
      image:
        "https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },

    {
      id: 2,
      title: "NodeJs",
      description:
        "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that executes JavaScript code outside of a browser.",
      image:
        "https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },

    {
      id: 3,
      title: "Python",
      description:
        "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.",
      image:
        "https://images.pexels.com/photos/16018144/pexels-photo-16018144/free-photo-of-pessoa-programando-hacker.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2g",
    },

    {
      id: 4,
      title: "Docker",
      description:
        "Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software containers.",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id}>
          <img src={post.image} alt={post.title} />
          <div className="Content">
            <PostLink to={`/singlepost/${post.id}`}>
              <h2>{post.title}</h2>
            </PostLink>
            <p>{post.description}</p>
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
