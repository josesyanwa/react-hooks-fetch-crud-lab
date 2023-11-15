import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the server
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleAddQuestion = (newQuestion) => {
    // Update state with the new question
    setQuestions([...questions, newQuestion]);

    // Send a POST request to add the question on the server
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => console.log("New question added:", data))
      .catch((error) => console.error("Error adding new question:", error));
  };

  const handleDeleteQuestion = (id) => {
    // Update state by removing the question with the specified id
    setQuestions(questions.filter((question) => question.id !== id));

    // Send a DELETE request to remove the question on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => console.log("Question deleted successfully"))
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    // Update state with the updated correctIndex
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, correctIndex } : question
      )
    );

    // Send a PATCH request to update the correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => console.log("Correct answer updated successfully"))
      .catch((error) =>
        console.error("Error updating correct answer:", error)
      );
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
