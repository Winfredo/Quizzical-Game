import React, { useState, useEffect } from "react";
import "../App.css";

const Questionspage = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
      );
      if (!res.ok) {
        setError("Failed to fetch questions");
        return;
      }
      const data = await res.json();

      const prepared = data.results.map((q) => ({
        ...q,
        answers: [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));

      setQuestions(prepared);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  function handleAnswerClick(questionIndex, answer) {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }

  function checkAnswers() {
    setShowResults(true);
  }

  function playAgain() {
    setSelectedAnswers({});
    setShowResults(false);
    setQuestions([]);
    fetchQuestions();
  }

  const score = questions.reduce((acc, q, index) => {
    if (selectedAnswers[index] === q.correct_answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div>
      {loading && <p>Loading. Please wait..</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {questions.map((question, index) => (
          <div key={index} className="questions-container">
            <p className="question">{decodeHtml(question.question)}</p>
            <div className="answers-container">
              {question.answers.map((answer, answerIndex) => {
                const isSelected = selectedAnswers[index] === answer;
                let className = "answer-button";

                if (showResults) {
                  if (answer === question.correct_answer) {
                    className += " correct";
                  } else if (isSelected && answer !== question.correct_answer) {
                    className += " wrong";
                  }
                } else if (isSelected) {
                  className += " selected";
                }

                return (
                  <button
                    key={answerIndex}
                    onClick={() => handleAnswerClick(index, answer)}
                    className={className}
                  >
                    {decodeHtml(answer)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {questions.length > 0 && !loading && (
        <div className="quiz-footer">
          {!showResults ? (
            <button
              onClick={checkAnswers}
              disabled={!allAnswered}
              className="check-answers-button"
            >
              Check Answers
            </button>
          ) : (
            <div>
              <p>
                You scored {score}/{questions.length} correct answers
              </p>
              <button onClick={playAgain} className="play-again-btn">
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questionspage;
