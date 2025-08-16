import React, { useState, useEffect } from "react";
import "../App.css";

const Questionspage = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function getAnswers(question) {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }

   function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&category=17&difficulty=medium&type=multiple"
        );
       if (!res.ok) {
        setError("Failed to fetch questions");
        return;
      }
        const data = await res.json();
        console.log(data);
        setQuestions(data.results);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      {loading && <p>Loading. Please wait..</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {questions.map((question, index) => (
          <div key={index} className="questions-container">
            <p className="question">{decodeHtml(question.question)}</p>
            <div className="answers-container">
              {getAnswers(question).map((answer, answerIndex) => (
                <p className="answer" key={answerIndex}>
                  <button className="answer-button">{decodeHtml(answer)}</button>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {questions.length > 0 && !loading && (
        <button className="check-answers-button">Check Answers</button>
      )}
    </div>
  );
};

export default Questionspage;
