import React, { useState, useEffect, useRef } from "react";
import FlashCardList from "./components/FlashCardList";
import './style/app.css'
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
        .then(res => setCategories(res.data.trivia_categories))
  }, [])

  //to convert the HTML code into string
  function decodeStringFromHtml(str){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php',{
        params:{
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashCards(res.data.results.map((ele, index) => {
          const answer = decodeStringFromHtml(ele.correct_answer);
          const options = [...ele.incorrect_answers.map(a => decodeStringFromHtml(a)), answer]
          return{
            id: `${index}-${Date.now()}`,
            question: decodeStringFromHtml(ele.question),
            answer: ele.correct_answer,
            options: options.sort(() => Math.random() - 0.5)
          }
        }))
      })
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" ref={categoryEl}>
            {categories.map(ele => {
              return <option value={ele.id} key={ele.id}>{ele.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number Of Questions</label>
          <input type="text" name="amount" id="amount" min="1" step="1" defaultValue={10} ref={amountEl}/>
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcard={flashCards} />
      </div>
    </>
  );
}

// const SAMPLE_FLASHCARD = [
//   {
//     id: 1,
//     question: "What is 2 + 3",
//     answer: "5",
//     options: [
//       '2',
//       '4',
//       '7',
//       '5',
//     ]
//   },
//   {
//     id: 2,
//     question: "What is 1 + 1",
//     answer: "2",
//     options: [
//       '2',
//       '4',
//       '7',
//       '5',
//     ]
//   },
//   {
//     id: 3,
//     question: "What is 4 + 3",
//     answer: "7",
//     options: [
//       '2',
//       '4',
//       '7',
//       '5',
//     ]
//   },
// ]

export default App;
