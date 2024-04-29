import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  
  const handleValue = (value) => {

    if(value === "="){
      if(expression === ''){
        setError('Error')
      }else{
        setAnswer(calculation(expression))
      }
      
    }else if(value === "C"){
      setExpression('')
      setAnswer('')
      setError('')
    }else{
      setExpression( expression + value);
    }
  }

  const calculation = (expression) => {
   

    const operators = ['+', '-', '*', '/'];
    let currentNumber = '';
    let currentOperator = '';
    const numbers = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (operators.includes(char)) {
            if (currentNumber !== '') {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            currentOperator = char;
        } else if(expression[expression.length-1] === "+" || expression[expression.length-1] === "/" || expression[expression.length-1] === "*" | expression[expression.length-1] === "-"){
            return setError('Error')
        }else if(expression[0] === "+" || expression[0] === "/" || expression[0] === "-" || expression[0] === "*"){
          return setError('Error')
        } else {
            currentNumber += char;
        }
    }

    if (currentNumber !== '') {
        numbers.push(parseFloat(currentNumber));
    }

    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        const number = numbers[i];
        switch (currentOperator) {
            case '+':
                result += number;
                break;
            case '-':
                result -= number;
                break;
            case '*':
                result *= number;
                break;
            case '/':
                result /= number;
                break;
            default: 
        }
    }

    return result;

  }

  const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', 'C', '0', '=', '/'];

 


  return (
    <div className='App'>
      <div className='sec-a'>
        <h1>React Calculator</h1>
        <input type='text' value={expression} readOnly></input>
        <div className='answer'>{error ? "Error" : answer}</div>
      </div>
      <div className='sec-b' >
      {buttons.map((button, index) => (
          <button key={index} onClick={() => handleValue(button)}>
            {button}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App