import React, { useState, useEffect } from 'react';
import { operationsFunc } from './util.ts';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('+');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [showResult, setShowResult] = useState(false); 

    useEffect(() => {
        const storedHistory = localStorage.getItem('calculatorHistory');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
    }, [history]);

    const handleCalculate = () => {
        if (num1 === '' || num2 === '') {
            setError('Both numbers are required.');
            return;
        }

        setError('');
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);

        const res = operationsFunc[operation](number1, number2);

        setResult(res);
        setShowResult(true); 
        const newEntry = { num1, num2, operation, result: res };
        const newHistory = [newEntry, ...history.slice(0, 9)];
        setHistory(newHistory);
        setShowHistory(true);
    };

    const inputBox = "p-2 border rounded bg-white text-black";

    return (
        <div className="flex flex-col items-center mt-20 bg-beige min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-8">Simple Calculator</h1>
            <div className="flex space-x-4 mb-4">
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
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
                onClick={handleCalculate}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                disabled={num1 === '' || num2 === ''}
            >
                Submit
            </button>
            {showResult && (
                <div className="mt-4">
                    <h2 className="text-2xl">Result: {result !== null ? result : 'N/A'}</h2>
                </div>
            )}
            {showHistory && history.length > 0 && (
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
            )}
        </div>
    );
};

export default Calculator;
