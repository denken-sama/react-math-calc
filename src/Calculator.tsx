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
              onClick={() => {setOperation('multiply'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              4. Multiplication (*)
            </button>
            <button
              onClick={() => {setOperation('percentage'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              5. Percentage (%)
            </button>
                        <button
              onClick={() => {setOperation('sqrt'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              6. Square Root (√)
            </button>
            <button
              onClick={() => {setOperation('round'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              7. Round (e.g., Round 3.7 = 4)
            </button>
            <button
              onClick={() => {setOperation('floor'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              8. Floor (e.g., Floor 3.7 = 3)
            </button>
            <button
              onClick={() => {setOperation('ceil'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              9. Ceil (e.g., Ceil 3.2 = 4)
            </button>
                        <button
              onClick={() => {setOperation('power'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              10. Power (^)
            </button>
            <button
              onClick={() => {setOperation('factorial'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              11. Factorial (!)
            </button>
                        <button
              onClick={() => {setOperation('reciprocal'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              12. Reciprocal (1/x)
            </button>
            <button
              onClick={() => {setOperation('sin'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              13. Sine (sin)
            </button>
            <button
              onClick={() => {setOperation('cos'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              14. Cosine (cos)
            </button>
            <button
              onClick={() => {setOperation('tan'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              15. Tangent (tan)
            </button>
            <button
              onClick={() => {setOperation('log'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              16. Natural Logarithm (ln)
            </button>
                        <button
              onClick={() => {setOperation('log10'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              17. Logarithm Base 10 (log10)
            </button>
            <button
              onClick={() => {setOperation('exp'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              18. Exponential (e^x)
            </button>
            <button
              onClick={() => {setOperation('angleConversion'); setCurrentStep(2);}}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              19. Angle Conversion (deg ⇄ rad)
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
          <h3 className="text-xl font-semibold mb-6 text-blue-800">
            {operationNames[operation as keyof typeof operationNames]}
          </h3>
          <div className="space-y-4">
            {operation === 'angleConversion' && (
              <div className="flex justify-center mb-4">
                <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                  <button
                    onClick={() => setConversionDirection('deg2rad')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      conversionDirection === 'deg2rad'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Degrees → Radians
                  </button>
                  <button
                    onClick={() => setConversionDirection('rad2deg')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      conversionDirection === 'rad2deg'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Radians → Degrees
                  </button>
                </div>
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={operation === 'angleConversion'
                  ? conversionDirection === 'deg2rad'
                    ? 'Degrees'
                    : 'Radians'
                  : 'First number'}
              />
            </div>
            {['sqrt', 'round', 'floor', 'ceil', 'reciprocal', 'sin', 'cos', 'tan', 'factorial', 'log', 'log10', 'angleConversion'].includes(operation) ? null : (
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
            )}
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
            Enter your expression (e.g., 5 + 3) or unary operation (e.g., sqrt 9, reciprocal 5):
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 10 / 2 or reciprocal 5"
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
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Full-Featured Math Calculator</h1>
            <div className="border-b-2 border-blue-500 w-16 mx-auto mb-4"></div>
                                                                                                                                                                                                <p className="text-gray-600">Operations: Add (+), Subtract (-), Multiply (x), Divide (÷), Percentage (%), Square Root (√), Power (x^y), Round (R), Floor (F), Ceil (C), Factorial (!), Sine (sin), Cosine (cos), Tangent (tan), Natural Log (ln), Log Base 10 (log10), Exponential (e^x), Degrees to Radians (deg→rad), Radians to Degrees (rad→deg)</p>
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
                onClick={resetInputsAndResult}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                New Calculation
              </button>
            </div>
          )}

          {/* Memory Display and Controls */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="font-bold text-lg text-gray-800 mb-2">Memory: {memory !== null ? memory : 'Empty'}</div>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={handleMemoryClear}
                className="bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-2 rounded-lg text-sm transition-colors"
              >
                MC
              </button>
              <button
                onClick={handleMemoryRecall}
                className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-2 rounded-lg text-sm transition-colors"
              >
                MR
              </button>
              <button
                onClick={handleMemoryAdd}
                className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-2 rounded-lg text-sm transition-colors"
              >
                M+
              </button>
              <button
                onClick={handleMemorySubtract}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-2 rounded-lg text-sm transition-colors"
              >
                M-
              </button>
              <button
                onClick={handleMemoryStore}
                className="bg-purple-400 hover:bg-purple-500 text-white font-medium py-2 px-2 rounded-lg text-sm transition-colors"
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