import React, { useState, useEffect, useRef } from 'react'

export default function FlashCard({ flash }) {
    
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [flash.question, flash.answer, flash.options])

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    // <div onClick={() => setFlip(!flip)}>
    //     {flip ? flash.answer : flash.question}
    // </div>
    <div className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
      style={{height: height}}
      >
        <div className="front" ref={frontEl}>
            {flash.question}
            <div className="flashcard-options">
                {flash.options.map((ele, index) => {
                    return <div key={index} className="flashcard-option">{ele}</div>
                })}
            </div>
        </div>
        <div className="back" ref={backEl}>{flash.answer}</div>

    </div>
  );
}
