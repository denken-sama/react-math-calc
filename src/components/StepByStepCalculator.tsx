import React from 'react';

interface StepByStepCalculatorProps {
  currentStep: number;
  setOperation: (op: string) => void;
  setCurrentStep: (step: number) => void;
  operation: string;
  setConversionDirection: (dir: 'deg2rad' | 'rad2deg') => void;
  conversionDirection: 'deg2rad' | 'rad2deg';
  num1: string;
  setNum1: (num: string) => void;
  num2: string;
  setNum2: (num: string) => void;
  handleStepByStepCalculation: () => void;
  resetCalculator: () => void;
}

const operationNames: { [key: string]: string } = {
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

const StepByStepCalculator: React.FC<StepByStepCalculatorProps> = ({
  currentStep,
  setOperation,
  setCurrentStep,
  operation,
  setConversionDirection,
  conversionDirection,
  num1,
  setNum1,
  num2,
  setNum2,
  handleStepByStepCalculation,
  resetCalculator,
}) => {
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
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">
          {operationNames[operation]}
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
  return null;
};

export default StepByStepCalculator;