import React, { useState } from 'react';

const Calculator = () => {
        const [mode, setMode] = useState('menu'); // 'menu', 'step-by-step', 'expression' // 'initial', 'menu', 'step-by-step', 'expression' // 'initial', 'menu', 'step-by-step', 'expression' // 'menu', 'step-by-step', 'expression'
  const [currentStep, setCurrentStep] = useState(0);
  const [operation, setOperation] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [memory, setMemory] = useState<number | null>(null); // New state for memory
  const [conversionDirection, setConversionDirection] = useState<'deg2rad' | 'rad2deg'>('deg2rad'); // State for angle conversion direction

  // Calculator operations
  const add = (x: number, y: number): number => x + y;
const multiply = (x: number, y: number): number => x * y;
  const subtract = (x: number, y: number): number => x - y;
  const divide = (x: number, y: number): number | string => {
    if (y !== 0) {
      return x / y;
    } else {
      return "Error: Cannot divide by zero!";
    }
  };

  const percentage = (x: number, y?: number): number => y !== undefined && !isNaN(y) ? (x / 100) * y : x / 100;

    const squareRoot = (x: number): number | string => x >= 0 ? Math.sqrt(x) : 'Error: Negative number';

    const power = (x: number, y: number): number => Math.pow(x, y);

  const round = (x: number): number => Math.round(x);
  const floor = (x: number): number => Math.floor(x);
      const ceil = (x: number): number => Math.ceil(x);

  const sin = (x: number): number => Math.sin(x * Math.PI / 180); // Assuming input in degrees
  const cos = (x: number): number => Math.cos(x * Math.PI / 180); // Assuming input in degrees
  const tan = (x: number): number | string => {
    const angleInRadians = x * Math.PI / 180;
    // Check for angles where tan is undefined (e.g., 90, 270 degrees)
    if (Math.abs(Math.cos(angleInRadians)) < 1e-10) {
      return "Error: Tan undefined";
    }
    return Math.tan(angleInRadians);
  };

    const reciprocal = (x: number): number | string => {
    if (x === 0) {
      return "Error: Cannot find reciprocal of zero!";
    } else {
      return 1 / x;
    }
  };

    const factorial = (x: number): number | string => {
    if (x < 0 || !Number.isInteger(x)) {
      return 'Error: Factorial is only defined for non-negative integers';
    }
    if (x === 0) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= x; i++) {
      result *= i;
    }
    return result;
  };

  const log = (x: number): number | string => {
    if (x <= 0) {
      return 'Error: Logarithm is only defined for positive numbers';
    }
    return Math.log(x); // Natural logarithm (base e)
  };

    const log10 = (x: number): number | string => {
    if (x <= 0) {
      return 'Error: Logarithm is only defined for positive numbers';
    }
    return Math.log10(x); // Base 10 logarithm
  };

  const exponential = (x: number): number => Math.exp(x);

  const degToRad = (deg: number): number => deg * (Math.PI / 180);

  const radToDeg = (rad: number): number => rad * (180 / Math.PI);

  // Memory operations
  const handleMemoryClear = () => {
    setMemory(null);
    setError('');
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      // Depending on the current mode, recall into num1 or expression
      if (mode === 'step-by-step') {
        setNum1(memory.toString());
        setNum2(''); // Clear num2 as memory recall usually applies to the first operand
      } else if (mode === 'expression') {
        setExpression(memory.toString());
      }
      setError('');
    } else {
      setError('Memory is empty!');
    }
  };

  const handleMemoryAdd = () => {
    if (result && !isNaN(parseFloat(result))) {
      const currentResult = parseFloat(result);
      setMemory(prevMemory => (prevMemory !== null ? prevMemory + currentResult : currentResult));
      setError('');
    } else {
      setError('No valid result to add to memory!');
    }
  };

  const handleMemorySubtract = () => {
    if (result && !isNaN(parseFloat(result))) {
      const currentResult = parseFloat(result);
      setMemory(prevMemory => (prevMemory !== null ? prevMemory - currentResult : -currentResult));
      setError('');
    } else {
      setError('No valid result to subtract from memory!');
    }
  };

  const handleMemoryStore = () => {
    if (result && !isNaN(parseFloat(result))) {
      setMemory(parseFloat(result));
      setError('');
    } else {
      setError('No valid result to store in memory!');
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

  const resetInputsAndResult = () => {
    setNum1('');
    setNum2('');
    setExpression('');
    setResult('');
    setError('');
  };

  const handleStepByStepCalculation = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (['sqrt', 'round', 'floor', 'ceil', 'reciprocal', 'sin', 'cos', 'tan', 'factorial', 'log', 'log10', 'exp', 'angleConversion'].includes(operation)) {
      if (isNaN(number1)) {
        setError(`Please enter a valid number for ${operation}!`);
        return;
      }
    } else {
      if (isNaN(number1) || isNaN(number2)) {
        setError('Please enter valid numbers!');
        return;
      }
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
          case 'percentage':
            operationSymbol = '%';
            calcResult = percentage(number1, number2);
            break;
          case 'multiply':
            calcResult = multiply(number1, number2);
            operationSymbol = '*';
            break;
      case 'sqrt':
        calcResult = squareRoot(number1);
        operationSymbol = '√';
        break;
      case 'power':
        calcResult = power(number1, number2);
        operationSymbol = '^';
        break;
      case 'round':
        calcResult = round(number1);
        operationSymbol = 'Round';
        break;
      case 'floor':
        calcResult = floor(number1);
        operationSymbol = 'Floor';
        break;
      case 'ceil':
        calcResult = ceil(number1);
        operationSymbol = 'Ceil';
        break;
      case 'factorial':
        calcResult = factorial(number1);
        operationSymbol = '!';
        break;
      case 'reciprocal':
        calcResult = reciprocal(number1);
        operationSymbol = '1/';
        break;
      case 'sin':
        calcResult = sin(number1);
        operationSymbol = 'sin';
        break;
      case 'cos':
        calcResult = cos(number1);
        operationSymbol = 'cos';
        break;
      case 'tan':
        calcResult = tan(number1);
        operationSymbol = 'tan';
        break;
      case 'log':
        calcResult = log(number1);
        operationSymbol = 'ln';
        break;
      case 'log10':
        calcResult = log10(number1);
        operationSymbol = 'log10';
        break;
      case 'exp':
        calcResult = exponential(number1);
        operationSymbol = 'e^';
        break;
      case 'angleConversion':
        if (conversionDirection === 'deg2rad') {
          calcResult = degToRad(number1);
          operationSymbol = 'deg→rad';
        } else {
          calcResult = radToDeg(number1);
          operationSymbol = 'rad→deg';
        }
        break;
      default:
        setError('Invalid operation!');
        return;
    }

          if (['sqrt', 'round', 'floor', 'ceil', 'factorial', 'reciprocal', 'sin', 'cos', 'tan', 'log', 'log10', 'exp', 'angleConversion'].includes(operation)) {
          setResult(`${operationSymbol}(${number1}) = ${calcResult}`);
        } else {
          setResult(`${number1} ${operationSymbol} ${number2} = ${calcResult}`);
        }   setError('');
  };

  const handleExpressionCalculation = () => {
    const parts = expression.split(/\s+/);

    if (parts.length === 2 && ['sqrt', 'round', 'floor', 'ceil', 'factorial', 'reciprocal', 'sin', 'cos', 'tan', 'log', 'log10', 'exp', 'deg2rad', 'rad2deg'].includes(parts[0].toLowerCase())) {
      const operation = parts[0].toLowerCase();
      const num = parseFloat(parts[1]);
      if (isNaN(num)) {
        setError(`Please enter a valid number for ${operation}!`);
        return;
      }
      let calcResult: number | string;
      let operationSymbol: string;
      switch (operation) {
        case 'sqrt':
          calcResult = squareRoot(num);
          operationSymbol = '√';
          break;
        case 'round':
          calcResult = round(num);
          operationSymbol = 'Round';
          break;
        case 'floor':
          calcResult = floor(num);
          operationSymbol = 'Floor';
          break;
        case 'ceil':
          calcResult = ceil(num);
          operationSymbol = 'Ceil';
          break;
        case 'factorial':
          calcResult = factorial(num);
          operationSymbol = '!';
          break;
        case 'reciprocal':
          calcResult = reciprocal(num);
          operationSymbol = '1/';
          break;
        case 'sin':
          calcResult = sin(num);
          operationSymbol = 'sin';
          break;
        case 'cos':
          calcResult = cos(num);
          operationSymbol = 'cos';
          break;
        case 'tan':
          calcResult = tan(num);
          operationSymbol = 'tan';
          break;
        case 'log':
          calcResult = log(num);
          operationSymbol = 'ln';
          break;
        case 'log10':
          calcResult = log10(num);
          operationSymbol = 'log10';
          break;
        case 'exp':
          calcResult = exponential(num);
          operationSymbol = 'e^';
          break;
        case 'deg2rad':
          calcResult = degToRad(num);
          operationSymbol = 'deg→rad';
          break;
        case 'rad2deg':
          calcResult = radToDeg(num);
          operationSymbol = 'rad→deg';
          break;
        default:
          setError('Invalid unary operation!');
          return;
      }
      setResult(`${operationSymbol}(${num}) = ${calcResult}`);
      setError('');
      return;
    } else if (parts.length !== 3) {
      setError('Please enter in format: number operator number (e.g., 5 + 3), or a unary operation (e.g., sqrt 9, reciprocal 5)');
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
              case '%':
            calcResult = percentage(num1, num2);
            break;
          case '*':
            calcResult = multiply(num1, num2);
            break;
      case '^':
        calcResult = power(num1, num2);
        break;
      default:
        setError('Unsupported operator! Use +, -, /, *, %, or ^');
        return;
    }

    setResult(`${num1} ${operator} ${num2} = ${calcResult}`);
    setError('');
  };

  const renderMenu = () => (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Select Calculation Mode:</h3>
      <div className="space-y-5">
        <button
          onClick={() => {setMode('step-by-step'); setCurrentStep(1);}}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Step-by-Step Calculation
        </button>
        <button
          onClick={() => setMode('expression')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Expression Input (e.g., 5 + 3 * 2)
        </button>
        <button
          onClick={() => window.close()}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Exit Calculator
        </button>
      </div>
    </div>
  );

  const renderStepByStep = () => {
    if (currentStep === 1) {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Choose an Operation:</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {setOperation('add'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Addition (+)
            </button>
            <button
              onClick={() => {setOperation('subtract'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Subtraction (-)
            </button>
            <button
              onClick={() => {setOperation('divide'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Division (/)
            </button>
            <button
              onClick={() => {setOperation('multiply'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Multiplication (*)
            </button>
            <button
              onClick={() => {setOperation('percentage'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Percentage (%)
            </button>
                        <button
              onClick={() => {setOperation('sqrt'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Square Root (√)
            </button>
            <button
              onClick={() => {setOperation('round'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Round
            </button>
            <button
              onClick={() => {setOperation('floor'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Floor
            </button>
            <button
              onClick={() => {setOperation('ceil'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Ceil
            </button>
                        <button
              onClick={() => {setOperation('power'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Power (^)
            </button>
            <button
              onClick={() => {setOperation('factorial'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Factorial (!)
            </button>
                        <button
              onClick={() => {setOperation('reciprocal'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Reciprocal (1/x)
            </button>
            <button
              onClick={() => {setOperation('sin'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Sine (sin)
            </button>
            <button
              onClick={() => {setOperation('cos'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Cosine (cos)
            </button>
            <button
              onClick={() => {setOperation('tan'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Tangent (tan)
            </button>
            <button
              onClick={() => {setOperation('log'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Natural Log (ln)
            </button>
                        <button
              onClick={() => {setOperation('log10'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Log Base 10 (log10)
            </button>
            <button
              onClick={() => {setOperation('exp'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Exponential (e^x)
            </button>
            <button
              onClick={() => {setOperation('angleConversion'); setCurrentStep(2);}}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Angle Conversion
            </button>
            <button
              onClick={resetCalculator}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
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
        divide: 'Division',
        multiply: 'Multiplication',
        percentage: 'Percentage',
        sqrt: 'Square Root',
        power: 'Power',
        round: 'Round',
        floor: 'Floor',
        ceil: 'Ceil',
        factorial: 'Factorial',
        reciprocal: 'Reciprocal',
        sin: 'Sine',
        cos: 'Cosine',
        tan: 'Tangent',
        log: 'Natural Logarithm',
        log10: 'Logarithm Base 10',
        exp: 'Exponential',
        angleConversion: 'Angle Conversion'
      };

      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">
            {operationNames[operation as keyof typeof operationNames]}
          </h3>
          <div className="space-y-5">
            {operation === 'angleConversion' && (
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-xl border border-gray-300 bg-gray-50 p-1 shadow-sm">
                  <button
                    onClick={() => setConversionDirection('deg2rad')}
                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                      conversionDirection === 'deg2rad'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Degrees → Radians
                  </button>
                  <button
                    onClick={() => setConversionDirection('rad2deg')}
                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                      conversionDirection === 'rad2deg'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Radians → Degrees
                  </button>
                </div>
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-left">
                {operation === 'angleConversion'
                  ? conversionDirection === 'deg2rad'
                    ? 'Enter degrees:'
                    : 'Enter radians:'
                  : 'Enter first number:'}
              </label>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                placeholder={operation === 'angleConversion'
                  ? conversionDirection === 'deg2rad'
                    ? 'Degrees value' : 'Radians value'
                  : 'First number'}
              />
            </div>
            {['sqrt', 'round', 'floor', 'ceil', 'reciprocal', 'sin', 'cos', 'tan', 'factorial', 'log', 'log10', 'exp', 'angleConversion'].includes(operation) ? null : (
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">Enter second number:</label>
                <input
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  placeholder="Second number"
                />
              </div>
            )}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleStepByStepCalculation}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Calculate
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
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
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Enter Your Expression:</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-left">
            Input your mathematical expression (e.g., 5 + 3 * 2) or unary operation (e.g., sqrt 9, reciprocal 5):
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="e.g., 10 / 2 + (3 * 4) or sin 90"
            onKeyPress={(e) => e.key === 'Enter' && handleExpressionCalculation()}
          />
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleExpressionCalculation}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Evaluate Expression
          </button>
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Advanced Calculator</h1>
            <div className="border-b-4 border-indigo-500 w-20 mx-auto mb-6 rounded-full"></div>
                                                                                                                                                                                                <p className="text-gray-600 text-sm leading-relaxed">Perform a wide range of calculations: basic arithmetic, percentages, square roots, powers, rounding, floor, ceil, factorials, reciprocals, trigonometric functions (sin, cos, tan), logarithms (ln, log10), exponentials, and angle conversions.</p>
          </div>

          {/* Main Content */}
          <div className="mb-6">
             {mode === 'menu' && renderMenu()}
            {mode === 'step-by-step' && renderStepByStep()}
            {mode === 'expression' && renderExpression()}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="mb-6 p-4 bg-green-50 border border-green-300 text-green-700 rounded-xl text-center">
              <div className="font-semibold text-base text-green-800">Result:</div>
              <div className="text-3xl font-bold text-green-900 mt-1">{result}</div>
            </div>
          )}

          {/* Reset Button (when showing results) */}
          {(result || error) && (
            <div className="text-center">
              <button
                onClick={resetInputsAndResult}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Start New Calculation
              </button>
            </div>
          )}

          {/* Memory Display and Controls */}
          <div className="mt-10 p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-inner">
            <div className="font-semibold text-xl text-gray-800 mb-4">Memory: <span className="font-bold text-indigo-600">{memory !== null ? memory : 'Empty'}</span></div>
            <div className="grid grid-cols-5 gap-3">
              <button
                onClick={handleMemoryClear}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                MC
              </button>
              <button
                onClick={handleMemoryRecall}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                MR
              </button>
              <button
                onClick={handleMemoryAdd}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                M+
              </button>
              <button
                onClick={handleMemorySubtract}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                M-
              </button>
              <button
                onClick={handleMemoryStore}
                className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                MS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;