import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "correctIndex" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the new question data to the parent component
    onAddQuestion(formData);
    // Clear the form after submitting
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {/* ... your form inputs here ... */}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
