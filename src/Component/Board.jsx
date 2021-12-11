import React, { useState, useEffect } from "react";

const Board = () => {
  const [sentence, setSentence] = useState("");
  const [scrambledSentence, setScrambledSentence] = useState("");
  const [score, seScore] = useState(0)

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
  },[sentence.length])
  
  function checkLetter(e){
    if(e.target.value.toLowerCase() === e.target.id.toLowerCase()){
        
    }
  }
  


  return (
    <div className="main-container">
      <h1 id="scrambled-word">{scrambledSentence}</h1>
      <p>
        Guess the sentence! Start typing. The yellow blocks are meant for spaces
      </p>
      <h2>Score: {score}</h2>
      {

          scrambledSentence.split(' ').map((word, i) => {
              return i === word.length - 1 && word.length !== 1 ? (
                <div key={i}>
                  {word.split("").map((char, j) => (
                    <input
                      type="text"
                      className="char-input"
                      style={{ backgroundColor: "#22222230" }}
                      key={j}
                      id={char}
                      maxlength="1"
                      onChange={(e) => checkLetter(e)}
                    />
                  ))}
                </div>
              ) : (
                <div key={i}>
                  {word.split("").map((char, j) => (
                    <input
                      type="text"
                      className="char-input"
                      style={{ backgroundColor: "#22222230" }}
                      key={j}
                      id={char}
                      maxlength="1"
                      onChange={(e) => checkLetter(e)}
                    />
                  ))}
                  <input
                    className="space-slot"
                    disabled
                    style={{ backgroundColor: "#22222230" }}
                  />
                </div>
              );
              
            })
      }
    </div>
  );
};

export default Board;
