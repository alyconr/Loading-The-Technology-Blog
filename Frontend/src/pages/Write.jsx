import styled from "styled-components";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Write = () => {
  const [title, setTitle] = useState("");

  console.log(title);

  return (
    <Wrapper>
      <div className="Editor">
        <input type="text" placeholder="Title" />
        <ReactQuill
          className="Box-editor"
          theme="snow"
          value={title}
          onChange={setTitle}
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
            style = {{display : "none"}}
            type="file"
            name=""
            id="file"
            
          />
          <label className="input-file" htmlFor="file">Upload Image</label>
          <div className="actions">
            <button>Save Draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="box-2">
          <h1>Category</h1>
          <Category>
          <input type="radio" name="category" value="javascript" id="art" />
          <label htmlFor="javascript"> Javascript </label>
          </Category>
          <Category>
          <input type="radio" name="category" value="javascript" id="art" />
          <label htmlFor="javascript"> CSS </label>
          </Category>
          <Category>
          <input type="radio" name="category" value="javascript" id="art" />
          <label htmlFor="javascript"> React </label>
          </Category>
          <Category> <input type="radio" name="category" value="javascript" id="art" />
          <label htmlFor="javascript"> Node </label></Category>
         <Category>
         <input type="radio" name="category" value="javascript" id="art" />
          <label htmlFor="javascript"> Python </label>
         </Category>
          <Category><input type="radio" name="category" value="javascript" id="art" />
          <label htmlFor="javascript"> Docker </label></Category>
          
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

  .Editor {
    flex: 5;
    margin-left: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

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

