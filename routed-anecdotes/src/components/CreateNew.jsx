import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addAnecdote }) => {
  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentField} />
        </div>
        <div>
          author
          <input name="author" {...authorField} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoField} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
