import React, { useState, useEffect } from "react";

const Board = () => {
  const [sentence, setSentence] = useState("");
  const [scrambledSentence, setScrambledSentence] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [tapIndexed, setTapIndexed] = useState(false);
  const [inputs, setInputs] = useState(null);
  const [pointed, setPointed] = useState(false);
  const [index, setIndex] = useState(1);

  window.currentInputs = inputs;

  useEffect(() => {
    async function fetchWord() {
      const url = `https://api.hatchways.io/assessment/sentences/${index}`;
      const response = await fetch(url);
      const data = await response.json();
      setSentence(data.data.sentence);
    }
    fetchWord();
  }, [index]);

  console.log("secondRender");
  function scramble() {
    const words = sentence.split(" ");
    const scrambledWords = words.map((word) => {
      const countIdx = {};
      let scrambled = "";
      while (scrambled.length !== word.length) {
        const randomIdx = Math.floor(Math.random() * word.length);
        if (!countIdx[randomIdx]) {
          console.log(word[randomIdx]);
          countIdx[randomIdx] = word[randomIdx];
          scrambled += word[randomIdx];
        }
      }
      return scrambled;
    });

    setScrambledSentence(scrambledWords.join(" "));
  }

  useEffect(() => {
    scramble();
  }, [sentence.length]);

  //   if(answer === scrambledSentence) setScore(old => old += 1)
  function checkKey(e) {
    if (!tapIndexed) {
      let tempInputs = document.querySelectorAll(
        ".sentence-container > div > input"
      );
      console.log("temp", tempInputs);
      setInputs(tempInputs);
      for (let i = 0; i < tempInputs.length; i++) {
        tempInputs[i].tapIndex = i;
        setTapIndexed(true);
      }
    }
    console.log("keycode", e.keyCode);
    if (e.keyCode === 8) {
      const prevEle = inputs[e.target.tapIndex - 1];
      if (e.target.value.length === 1) {
        e.target.value = "";
        e.target.style.backgroundColor = "#22222220";
        setAnswer((old) => old.slice(0, old.length - 1));
      } else if (prevEle && prevEle.className === "space-slot") {
        prevEle.focus();
        prevEle.value = "";
        prevEle.style.backgroundColor = "#ffbf00";
        setAnswer((old) => old.slice(0, old.length - 1));
      } else if (prevEle) {
        prevEle.focus();
        prevEle.value = "";
        prevEle.style.backgroundColor = "#22222220";
        setAnswer((old) => old.slice(0, old.length - 1));
      }

      if (pointed) {
        setPointed(false);
        setScore((old) => (old -= 1));
      }
    } else if (pointed && e.keyCode === 13) {
      setPointed(false);
      setIndex((old) => (old += 1));
      setAnswer("");
      setTapIndexed(false);
    }
  }

  function checkLetter(e) {
    if (!tapIndexed) {
      let tempInputs = document.querySelectorAll(
        ".sentence-container > div > input"
      );
      console.log("temp", tempInputs);
      setInputs(tempInputs);
      for (let i = 0; i < tempInputs.length; i++) {
        tempInputs[i].tabIndex = i;
        setTapIndexed(true);
      }
    }
    window.e = e;
    if (e.target.value === e.target.id) {
      e.target.style.backgroundColor = "#00b300";
      e.target.style.color = "white";
    } else if (e.target.className === "space-slot" && e.target.value === " ") {
      e.target.style.backgroundColor = "#00b300";
      e.target.style.color = "white";

      if (answer.concat(e.target.value) === scrambledSentence)
        setScore((old) => old + 1);
    } else if (e.key === "Delete" || e.key === "Backspace") {
      console.log("1231212");
    } else if (e.target.className === "space-slot" && e.target.value !== " ") {
      e.target.style.backgroundColor = "#ffbf00";
      e.target.style.color = "white";
    } else {
      e.target.style.backgroundColor = "#22222220";
      e.target.style.color = "black";
    }
    setAnswer((old) => old.concat(e.target.value));
    let nextInput = inputs[e.target.tapIndex + 1];
    if (nextInput) nextInput.focus();
    if (answer.concat(e.target.value) === scrambledSentence) {
      setScore((old) => old + 1);
      setPointed(true);
    }
  }

  return (
    <div className="main-container">
      <h1 id="scrambled-word">{scrambledSentence}</h1>
      <p>
        Guess the sentence! Start typing. The yellow blocks are meant for spaces
      </p>
      <p>{answer}</p>
      <p>{answer.length}</p>
      <h2>Score: {score}</h2>
      <section className="sentence-container">
        {scrambledSentence.split(" ").map((word, i) => {
          console.log();

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
                  autoFocus
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
                  autoFocus
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
                autoFocus
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Board;
