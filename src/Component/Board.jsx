import React, { useState, useEffect, useMemo } from "react";

const Board = () => {
  const [sentence, setSentence] = useState("");
  const [scrambledSentence, setScrambledSentence] = useState("");
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    async function fetchWord() {
        const url = "https://api.hatchways.io/assessment/sentences/1";
        const response = await fetch(url);
        const data = await response.json();
        setSentence(data.data.sentence)
    }
    fetchWord()
  }, []);
  
  function scramble() {
    const words = sentence.split(" ");
    const scrambledWords = words.map((word) => {
        const countIdx = {};
        let scrambled = '';
      while(scrambled.length !== word.length) {
        const randomIdx = Math.floor(Math.random() * word.length);
        if(!countIdx[randomIdx] ){
            console.log(word[randomIdx])
            countIdx[randomIdx] = word[randomIdx]
            scrambled += word[randomIdx]
        }
      }
      return scrambled
    });

    setScrambledSentence(scrambledWords.join(' '))
  }

  useEffect(()=> {
    scramble()
    setFirstRender(false)
  },[sentence.length])


//   if(answer === scrambledSentence) setScore(old => old += 1)
    function checkKey(e){
        console.log('keycode',e.keyCode)
            window.e = e;

            if(e.keyCode === 8) e.target.previousElementSibling.focus();
            // const inputs = document.querySelectorAll(
            //     ".sentence-container > div > input"
            // );
            // for (let i = 0; i < inputs.length; i++) {
            //     inputs[i].tapIndex = i;
            // }

            // let prevIdx = inputs[e.target.tapIndex - 1];

                
                // e.target.
                // setSelectionRange(e.target.tapIndex, e.target.tapIndex - 1);
                // prevIdx.focus();
            // if (answer === scrambledSentence) setScore((old) => old + 1);
        
    }  


  function checkLetter(e){
    console.log('1', e.keyCode)

    if(e.target.value === e.target.id){
        e.target.style.backgroundColor = "#00b300";
        e.target.style.color ="white"

        setAnswer(old => old.concat(e.target.value))
        if (answer.concat(e.target.value) === scrambledSentence) setScore((old) => old + 1);

    } else if( e.target.className === 'space-slot' && e.target.value === ' '){
        e.target.style.backgroundColor = "#00b300";
        e.target.style.color = "white";
        setAnswer((old) => old.concat(e.target.value));

        if (answer.concat(e.target.value) === scrambledSentence)
          setScore((old) => old + 1);
    }  else if (e.target.className === 'space-slot' && e.target.value !== ' '){
       e.target.style.backgroundColor = "#ffbf00";
       e.target.style.color = "white";
       
    } 
    else {
        e.target.style.backgroundColor = "#22222220";
        e.target.style.color = "black";
    }
    e.target.previousElementSibling.focus();

  }
  


  return (
    <div className="main-container">
      <h1 id="scrambled-word">{scrambledSentence}</h1>
      <p>
        Guess the sentence! Start typing. The yellow blocks are meant for spaces
      </p>
      <p>
        {answer}
      </p>
      <h2>Score: {score}</h2>
      <section className="sentence-container">
      {
          scrambledSentence.split(' ').map((word, i) => {
              console.log()

              return i === word.length - 1 && word.length !== 1 ? (
                <div className="word-container" key={i}>
                  {word.split("").map((char, j) => (
                    <input
                      type="text"
                      className="char-input"
                      style={{
                        backgroundColor: "#22222230",
                        width: `${100 / word.length - 3}%`,
                      }}
                      key={j}
                      id={char}
                      maxLength="1"
                      onChange={(e) => checkLetter(e)}
                      onKeyDown={(e) => checkKey(e)}
                      autofocus="true"
                    />
                  ))}
                </div>
              ) : (
                <div className="word-container" key={i}>
                  {word.split("").map((char, j) => (
                    <input
                      type="text"
                      className="char-input"
                      style={{
                        backgroundColor: "#22222230",
                        width: `${100 / word.length + 1 - 3}%`,
                      }}
                      key={j}
                      id={char}
                      maxLength="1"
                      onChange={(e) => checkLetter(e)}
                      onKeyDown={(e) => checkKey(e)}
                      autofocus="true"
                    />
                  ))}
                  <input
                    id="space"
                    className="space-slot"
                    style={{
                      backgroundColor: "#ffbf00",
                      width: `${100 / word.length + 1 - 3}%`,
                    }}
                    maxLength="1"
                    onChange={(e) => checkLetter(e)}
                    onKeyDown={(e) => checkKey(e)}
                    autofocus="true"
                  />
                </div>
              );
              
            })
        }
        </section>
    </div>
  );
};

export default Board;
