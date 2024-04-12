//1. Import dependencies
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {Fragment} from "react";
import React, {useState, useEffect, useRef} from 'react';

function App() {
  //2. Setup references and state hooks
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [model, setModel] = useState(null);
  const [answer, setAnswer] = useState();

  //3. Load TensorFlow model
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded");
  }

  useEffect(() => {loadModel()}, [])

  //4.Handle questions
  async function answerQuestion(e) {
    if(e.which ===13 && model!==null){
      console.log("question submitted");
    }
    const passage= passageRef.current.value;
    const question = questionRef.current.value;

    const answers = await model.findAnswers(question, passage);
    setAnswer(answers);
    console.log(answers);
  }


  return(
    <div className='container'>
      <h1>ALLISON AI</h1>
      {/*5. Setup input, question and result area*/}
      {
        model == null ?
        <div className='container1'>
          <div>Model Loading</div><br />
          <Loader
          type="Puff"
          color='gold'
          height={100}
          width={100} />
        </div>
        :
        <Fragment>
          Passage
          <textarea ref={passageRef} rows='30' cols='100'></textarea><br></br>
          Ask a question
          <input ref={questionRef} onKeyDown={answerQuestion} size="80"></input><br></br>
          Answer
          {answer ? answer.map((ans,idx) =><div key={idx}><b>Answer {idx+1} - </b>{ans.text} {ans.score}</div>)
          :""
          }
        </Fragment>
      }
    </div>
  );
}

export default App
