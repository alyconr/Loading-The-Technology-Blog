import styled from "styled-components";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const Write = () => {
  const location = useLocation();
  const [title, setTitle] = useState(location?.state?.title || "");
  const [desc, setDesc] = useState(location?.state?.description || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(location?.state?.category || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:9000/api/v1/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Request Data:", {
    title,
    description: desc,
    category: cat,
    image: file,
  });

  // Make the axios request

  const handleClick = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      location.state
        ? await axios.put(
            `http://localhost:9000/api/v1/posts/${location.state.id}`,
            {
              title,
              description: desc,
              category: cat,
              image: file ? imgUrl : "",
            },
            {
              withCredentials: true,
            }
          )
        : await axios.post(
            "http://localhost:9000/api/v1/posts",
            {
              title,
              description: desc,
              category: cat,
              image: file.name ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true,
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="Editor">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          className="editor"
          theme="snow"
          value={desc}
          onChange={setDesc}
        />
      </div>
      <div className="Preview">
        <div className="box-1">
          <h1>Publish</h1>
          <span>
            {" "}
            <b>Status: </b> Draft
          </span>
          <span>
            {" "}
            <b>Visibility: </b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="input-file" htmlFor="file">
            Upload Image
          </label>
          <div className="actions">
            <button>Save Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="box-2">
          <h1>Category</h1>
          <Category>
            <input
              type="radio"
              checked={cat === "Javascript"}
              name="cat"
              value="Javascript"
              id="javascript"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="javascript"> Javascript </label>
          </Category>
          <Category>
            <input
              type="radio"
              name="cat"
              checked={cat === "CSS"}
              value="CSS"
              id="css"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="css"> CSS </label>
          </Category>
          <Category>
            <input
              type="radio"
              name="cat"
              checked={cat === "React"}
              value="React"
              id="react"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="react"> React </label>
          </Category>
          <Category>
            {" "}
            <input
              type="radio"
              name="cat"
              checked={cat === "Node"}
              value="Node"
              id="node"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="node"> Node </label>
          </Category>
          <Category>
            <input
              type="radio"
              name="cat"
              checked={cat === "Python"}
              value="Python"
              id="python"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="python"> Python </label>
          </Category>
          <Category>
            <input
              type="radio"
              name="cat"
              checked={cat === "Docker"}
              value="Docker"
              id="docker"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="docker"> Docker </label>
          </Category>
        </div>
      </div>
    </Wrapper>
  );
};

export default Write;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin: 0 auto;
  }

  .Editor {
    flex: 5;
    margin-left: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media only screen and (max-width: 768px) {
      margin-left: 0;
    }

    .Box-editor {
      height: 400px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: auto;
    }

    input {
      padding: 0.5rem;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ccc;
    }
  }

  .Preview {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .box-1,
    .box-2 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1rem;
      flex: 1;
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(9, 9, 121, 1) 35%,
        rgba(0, 212, 255, 1) 100%
      );
      color: #fff;

      .input-file {
        width: 50%;
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        background-color: #fff;
        color: #000;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        background-color: #fff;
        color: #000;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 20px;
    height: 20px;
  }

  label {
    cursor: pointer;
  }
`;
