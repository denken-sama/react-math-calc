import React, { useState } from 'react';

const Calculator = () => {
  const [mode, setMode] = useState('menu'); // 'menu', 'step-by-step', 'expression'
  const [currentStep, setCurrentStep] = useState(0);
  const [operation, setOperation] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Calculator operations
  const add = (x: number, y: number): number => x + y;
  const subtract = (x: number, y: number): number => x - y;
  const divide = (x: number, y: number): number | string => {
    if (y !== 0) {
      return x / y;
    } else {
      return "Error: Cannot divide by zero!";
    }
  };

  const resetCalculator = () => {
    setMode('menu');
    setCurrentStep(0);
    setOperation('');
    setNum1('');
    setNum2('');
    setExpression('');
    setResult('');
    setError('');
  };

  const handleStepByStepCalculation = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setError('Please enter valid numbers!');
      return;
    }

    let calcResult: number | string;
    let operationSymbol: string;

    switch (operation) {
      case 'add':
        calcResult = add(number1, number2);
        operationSymbol = '+';
        break;
      case 'subtract':
        calcResult = subtract(number1, number2);
        operationSymbol = '-';
        break;
      case 'divide':
        calcResult = divide(number1, number2);
        operationSymbol = '/';
        break;
      default:
        setError('Invalid operation!');
        return;
    }

    setResult(`${number1} ${operationSymbol} ${number2} = ${calcResult}`);
    setError('');
  };

  const handleExpressionCalculation = () => {
    const parts = expression.split(/\s+/);
    
    if (parts.length !== 3) {
      setError('Please enter in format: number operator number (e.g., 5 + 3)');
      return;
    }

    const num1 = parseFloat(parts[0]);
    const operator = parts[1];
    const num2 = parseFloat(parts[2]);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers!');
      return;
    }

    let calcResult: number | string;
    switch (operator) {
      case '+':
        calcResult = add(num1, num2);
        break;
      case '-':
        calcResult = subtract(num1, num2);
        break;
      case '/':
        calcResult = divide(num1, num2);
        break;
      default:
        setError('Unsupported operator! Use +, -, or /');
        return;
    }

    setResult(`${num1} ${operator} ${num2} = ${calcResult}`);
    setError('');
  };

  const renderMenu = () => (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-6 text-blue-800">Choose how to enter your calculation:</h3>
      <div className="space-y-4">
        <button
          onClick={() => {setMode('step-by-step'); setCurrentStep(1);}}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          1. Menu-based (step by step)
        </button>
        <button
          onClick={() => setMode('expression')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          2. Expression (e.g., 5 + 3)
        </button>
        <button
          onClick={() => window.close()}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          3. Quit
        </button>
      </div>
    </div>
  );

  const renderStepByStep = () => {
    if (currentStep === 1) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-blue-800">Select operation:</h3>
          <div className="space-y-4">
            <button
              onClick={() => {setOperation('add'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              1. Addition (+)
            </button>
            <button
              onClick={() => {setOperation('subtract'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              2. Subtraction (-)
            </button>
            <button
              onClick={() => {setOperation('divide'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              3. Division (/)
            </button>
            <button
              onClick={resetCalculator}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      );
    } else if (currentStep === 2) {
      const operationNames = {
        add: 'Addition',
        subtract: 'Subtraction',
        divide: 'Division'
      };

      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-blue-800">
            {operationNames[operation as keyof typeof operationNames]}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Enter first number:</label>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="First number"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Enter second number:</label>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Second number"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStepByStepCalculation}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderExpression = () => (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-6 text-blue-800">Enter Expression</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter your expression (e.g., 5 + 3):
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 10 / 2"
            onKeyPress={(e) => e.key === 'Enter' && handleExpressionCalculation()}
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleExpressionCalculation}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Simple Math Calculator</h1>
            <div className="border-b-2 border-blue-500 w-16 mx-auto mb-4"></div>
            <p className="text-gray-600">Operations: Addition (+), Subtraction (-), Division (/)</p>
          </div>

          {/* Main Content */}
          <div className="mb-6">
            {mode === 'menu' && renderMenu()}
            {mode === 'step-by-step' && renderStepByStep()}
            {mode === 'expression' && renderExpression()}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
              <div className="font-bold text-lg">Result:</div>
              <div className="text-xl">{result}</div>
            </div>
          )}

          {/* Reset Button (when showing results) */}
          {(result || error) && (
            <div className="text-center">
              <button
                onClick={resetCalculator}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                New Calculation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;