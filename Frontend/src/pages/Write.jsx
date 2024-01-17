import styled from "styled-components";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { debounced } from "../utils/debounce";

const Write = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const draftParamId = new URLSearchParams(location.search).get("draftPost");
  

  const [title, setTitle] = useState(location?.state?.title || "");
  const [desc, setDesc] = useState(location?.state?.description || "");
  const [cont, setCont] = useState(location?.state?.content || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(location?.state?.category || "");
  const [draftSaved, setDraftSaved] = useState(false);
  const [draftId, setDraftId] = useState(draftParamId);

  useEffect(() => {
    const fetchData = async () => {
      if (draftId) {
        // Fetch the specific draft post based on draftId
        try {
          const response = await axios.get(`http://localhost:9000/api/v1/draftposts/${draftId}`);
          const draftData = response.data.post;
          setTitle(draftData.title || "");
          setDesc(draftData.description || "");
          setCont(draftData.content || "");
          setCat(draftData.category || "");
        } catch (err) {
          console.log(err);
        }
      } else {
        // Fetch the latest draft post if no draftId
        await fecthDraftPosts();
      }
    };

    fetchData();
  }, [draftId]);


  useEffect(() => {
        
    const saveDraftAutomatically = async () => {
      if (title && desc && cont) {
        try {
          const endpoit = draftId
            ? `http://localhost:9000/api/v1/draftposts/${draftId}`
            : "http://localhost:9000/api/v1/draftposts";

          const response = await axios({
            method: draftId ? "put" : "post",
            url: endpoit,
            data: {
              title,
              description: desc,
              content: cont,
              image: file ? file.name : "",
              category: cat,
            },
            withCredentials: true,
          });

          const newDraftId = response.data.post || draftId;
          setDraftId(newDraftId);
          setDraftSaved(true);
          toast.info("Draft saved successfully", {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (err) {
          console.error("Error saving draft:", err);
          toast.error("Error saving draft");
        }
      }
    };

    const debounceSaveDraft = debounced.debounced(saveDraftAutomatically, 2000);

    // Listen for changes in title, desc, cont, cat, and file
    debounceSaveDraft();

    return () => {
      debounced.cancel();
    };
  }, [title, desc, cont]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!title || !desc || !cont || !cat || !file) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      toast.info("Uploading image...", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:9000/api/v1/upload",
        formData
      );

      const imgUrl = res.data;

      location.state
        ? await axios.put(
            `http://localhost:9000/api/v1/posts/${location.state.id}`,
            {
              title,
              description: desc,
              content: cont,
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
              content: cont,
              image: file.name ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              category: cat,
            },
            { withCredentials: true }
          );

      toast.success("Post published successfully", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Error uploading image or publishing post");
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
        <textarea
          type="text"
          placeholder="Short Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <ReactQuill
          className="Box-editor"
          value={cont}
          onChange={setCont}
          placeholder="Write your blog here..."
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: ["serif", "sans-serif", "monospace", "Arial"] }],
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
              [{ color: [] }],
              [{ align: [] }],
              ["code-block"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "code-block",
            "link",
            "image",
            "color",
            "align",
          ]}
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
          <h5>{file ? `Uploaded: ${file.name}` : ""}</h5>
          {file ? (
            <div className="actions">
              <button>Save Draft</button>
              <button onClick={handleClick}>Publish</button>
            </div>
          ) : (
            <p> Please before Publish your post select an image</p>
          )}
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
      height: 600px;
      max-width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: hidden;
      resize: vertical;
    }

    input {
      padding: 0.5rem;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ccc;
      margin-top: 1rem;
      outline: none;
    }

    textarea {
      padding: 0.5rem;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ccc;
      resize: none;
      outline: none;
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
