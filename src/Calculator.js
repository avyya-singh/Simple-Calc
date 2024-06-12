import React, { useState } from 'react';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('Add');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const handleCalculate = () => {
        let res;
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);

        switch (operation) {
            case '+':
                res = number1 + number2;
                break;
            case '-':
                res = number1 - number2;
                break;
            case '×':
                res = number1 * number2;
                break;
            case '÷':
                res = number1 / number2;
                break;
            default:
                res = 0;
        }

        setResult(res);
        const newHistory = [{ num1, num2, operation, result: res }, ...history];
        setHistory(newHistory.slice(0, 10));
    };

    const inputBox = "p-2 border rounded bg-white text-black";

    return (
        <div className="flex flex-col items-center mt-20 bg-beige min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-8">Simple Calculator</h1>
            <div className="flex space-x-4 mb-4 ">
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Number 1"
                    className={inputBox}
                />
                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className={inputBox}
                >
                    <option value="+">Add</option>
                    <option value="-">Subtract</option>
                    <option value="×">Multiply</option>
                    <option value="÷">Divide</option>
                </select>
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Number 2"
                    className={inputBox}
                />
            </div>
            <button
                onClick={handleCalculate}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
                Submit
            </button>
            <div className="mt-4">
                <h2 className="text-2xl">Result: {result !== null ? result : 'N/A'}</h2>
            </div>
            <div className="mt-8">
                <h3 className="text-xl mb-2">Last 10 calculations:</h3>
                <ul className="list-disc list-inside text-left">
                    {history.map((entry, index) => (
                        <li key={index}>
                            {entry.num1} {entry.operation} {entry.num2} = {entry.result}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calculator;
