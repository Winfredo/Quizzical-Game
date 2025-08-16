import React from 'react'

const Mainpage = (props) => {
  return (
    <div className='mainpage'>
      <h1 className='title'>Quizzical</h1>
      <p className='description'>Some description if needed</p>
      <button onClick={props.onClick} className='start-quiz-button'>Start Quiz</button>
    </div>
  )
}

export default Mainpage
