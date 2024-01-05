import styled from "styled-components";
import { FaHandsClapping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dompurify from "dompurify";
import avatar from "../assets/user.png";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import axios from "axios";
import moment from "moment";

const CommentOnComments = ({ id, newComment, setNewComment }) => {
  const [commentList, setCommentList] = useState([]);
  const [cont, setCont] = useState([]);
  const [postCommentTrigger, setPostCommentTrigger] = useState(false);
  const location = useLocation();
  const urlId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const fetchCommentOnComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/v1/commentsoncomment/${id}`,
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

  useEffect(() => {
    fetchCommentOnComments();
  }, [id]);

  useEffect(() => {
    if (postCommentTrigger) {
      fetchCommentOnComments();
      setPostCommentTrigger(false);
    }
  }, [postCommentTrigger]);

  const createMarkup = (html) => {
    return {
      __html: dompurify.sanitize(html),
    };
  };

  const handlePostComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/commentsoncomment/${id}`,
        {
          onComment_id: id,
          postId: urlId,
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
      setNewComment("");
      setPostCommentTrigger(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {currentUser ? (
        <Button onClick={handlePostComment}>Comment</Button>
      ) : (
        <Link className="login" to="/login">
          Login to comment
        </Link>
      )}
      <Wrapper>
        {commentList.map((comment, index) => (
          <Comment key={index}>
            <div className="user">
              <img src={avatar} className="user-Img" alt="avatar" />
              <h2>{comment.fullname}</h2>
            </div>
            <div
              dangerouslySetInnerHTML={createMarkup(comment.comment)}
              style={{ maxWidth: "100%", overflow: "hidden" }}
              className="comment"
            />
          </Comment>
        ))}
      </Wrapper>
    </Container>
  );
};

export default CommentOnComments;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40%;
  margin: 0.5rem 6.5rem;
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
  margin: 0 3.5rem;

  .comment {
    width: 100%;
    border-radius: 5px;
    border: 3px solid #ccc;
    background: #f8f8f8;
    margin: 0 3.5rem;
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

  .user-Img {
    width: 40px;
    height: 40px;
  }
`;
