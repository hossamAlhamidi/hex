import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  return (
    <div className='App'>
      <RandomColorGenerator />
    </div>
  );
}

export default App;

export const RandomColorGenerator = () => {
  const [randomColor, setRandomColor] = useState(generateRandomColor());
  const [correctColor, setCorrectColor] = useState(randomColor);
  const [options, setOptions] = useState(generateOptionsColors());
  const [message, setMessage] = useState('');

  // know correct color when ever we have new generated random color so we can set it as correct color
  useEffect(() => {
    setCorrectColor(randomColor);
  }, [randomColor]);

  // change options when correct color changes so if you chose wrong color , the option remain the same
  useEffect(() => {
    setOptions(generateOptionsColors());
  }, [correctColor]);

  function generateOptionsColors() {
    const options = Array.from({ length: 2 }, () => generateRandomColor());
    options.push(randomColor);
    return shuffleArray(options);
  }

  const handleOptionClick = (selectedColor) => {
    if (selectedColor === correctColor) {
      setRandomColor(generateRandomColor());
      setMessage('');
    } else {
      setMessage('Wrong choice. Try again.');
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: randomColor,
          width: '100px',
          height: '100px',
          margin: '20px auto',
        }}
      />
      {/* <div>{randomColor}</div>
      <div>correct {correctColor}</div> */}

      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        {options.map((option) => (
          <div
            style={{
              border: '1px solid gray',
              padding: '2px',
              cursor: 'pointer',
              // backgroundColor: 'lightgray',
              // color: 'white',
            }}
            onClick={() => handleOptionClick(option)}
          >
            {' '}
            {option}
          </div>
        ))}
      </div>
      <div style={{ color: 'red' }}>{message}</div>
    </div>
  );
};
