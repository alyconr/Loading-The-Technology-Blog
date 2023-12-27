import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import dompurify from "dompurify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import avatar from "../assets/avatar.avif";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Comments = () => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [cont, setCont] = useState([]);
  const location = useLocation();
  const urlId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/comments/${urlId}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setCont(res.data);
        setCommentList(res.data.comments || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [urlId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/comments/${urlId}`,
        {
          postID: urlId,
          comment: newComment,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      const newCommentData = {
        comment: newComment,
        fullname: response.data.fullname,
      };
      setCommentList([...commentList, newCommentData]);
      console.log(newCommentData);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const createMarkup = (html) => {
    return {
      __html: dompurify.sanitize(html), // this will sanitize the html code to prevent XSS attacks
    };
  };

  return (
    <Container>
      <ReactQuill
        className="Box-editor"
        placeholder="Write your comment here..."
        value={newComment}
        onChange={setNewComment}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            ["clean"],
            [{ color: [] }],
            [{ align: [] }],
            ["code-block"],
          ],
        }}
        formats={[
          "bold",
          "italic",
          "underline",
          "strike",
          "code-block",
          "link",
          "image",
          "color",
          "align",
        ]}
      />
      <Action>
        {currentUser ? (
          <Button onClick={handleSubmit}>Comment</Button>
        ) : (
          <Link className="login" to="/login">
            Login to comment
          </Link>
        )}
      </Action>
      <Wrapper>
        {Array.isArray(commentList) &&
          commentList.map((comment, index) => (
            <Comment key={index}>
              <div className="user">
                <img className="user-Img" src={avatar} alt="" />

                <h2>{comment.fullname}</h2>
              </div>
              <div
                dangerouslySetInnerHTML={createMarkup(comment.comment)}
                style={{ maxWidth: "100%", overflow: "hidden" }}
                className="comment"
              />
              <PostedTime>
                {" "}
                <h6>{moment(comment.date).fromNow()}</h6>
              </PostedTime>
            </Comment>
          ))}
      </Wrapper>
    </Container>
  );
};

export default Comments;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .Box-editor {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    resize: vertical;
    border: 3px solid #ccc;
    background: #f8f8f8;
    margin: 0 6.5rem;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 1rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 15%;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px -100px;

  .login {
    text-decoration: none;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 25%;
    text-align: center;
    padding: 1rem 0.2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 75%;
  margin: 0 6.5rem;

  .comment {
    width: 100%;
    border-radius: 5px;
    border: 3px solid #ccc;
    background: #f8f8f8;
    margin: 0 6.5rem;
    padding: 1rem;
    overflow: hidden;
    resize: vertical;
  }

  h2 {
    font-size: 1rem;
    color: #333;
    margin: 0.5rem 0;
  }

  .user {
    display: flex;
    flex-direction: row;
  }
`;

const PostedTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 6.5rem;

  h6 {
    color: #333;
    margin: 0.5rem 0;
  }
`;
