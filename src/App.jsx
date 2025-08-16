import React, {useState} from 'react'
import Mainpage from './components/Mainpage'
import Questionspage from './components/Questionspage'
import './App.css'



const App = () => {
  const [flip, setFlip] = useState(false);

   function handleFlip(){
    console.log("Button clicked")
    setFlip(prevFlip => !prevFlip)
  }
  return (
    <main>
      {
        flip === true ? (
          <Questionspage />
        ): (
          <Mainpage onClick={handleFlip} />
        )
      }
    </main>
  )
}

export default App


//clicking the button should show the questionspage