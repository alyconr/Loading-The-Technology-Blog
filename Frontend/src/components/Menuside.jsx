import styled from "styled-components";
import { BsPostcardHeartFill } from "react-icons/bs";

const MenuLeft = () => {
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
      <h1> 
        Posts you may like
        <BsPostcardHeartFill color={"#6A072D"} size={40} style={{ marginLeft: "1rem" }} />
      </h1>

      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img className="postImg" src={post.image} alt="post" />
          <div className="postInfo">
            <h2 className="postTitle">{post.title}</h2>
            <p>{post.description}</p>
            <button>Read More</button>
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default MenuLeft;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1rem 1.5rem;
    color: #1a0a06;
    text-align: justify;
   
  }

  h2 {
    font-size: 1.2rem;
    font-weight: bolder;
  }
  .post {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1.5rem;
  }

  .postImg {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }

  .postInfo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .postTitle {
    font-size: 1.5rem;
    font-weight: 500;
  }

  button {
    border: none;
    border-radius: 5px;
    background-color: #3d84f7;
    cursor: pointer;
    color: white;
    font-weight: 500;
    width: 25%;
    padding: 0.5rem;
  }
`;
