import React, { useState } from 'react';
import { handleMemoryClear, handleMemoryRecall, handleMemoryAdd, handleMemorySubtract, handleMemoryStore } from './utils/memoryOperations';
import CalculatorMenu from './components/CalculatorMenu';
import StepByStepCalculator from './components/StepByStepCalculator';
import ExpressionCalculator from './components/ExpressionCalculator';
import { handleStepByStepCalculation, handleExpressionCalculation } from './utils/calculationLogic';

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
  const [theme, setTheme] = useState('default'); // New state for theme: 'default' or 'cyberpunk' // State for angle conversion direction









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





  return (
    <div className={theme === 'cyberpunk' ? 'min-h-screen bg-gray-900 text-green-400 flex items-center justify-center py-8 px-4' : 'min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4'}>
      <div className="max-w-lg w-full">
        <div className={theme === 'cyberpunk' ? 'bg-gray-800 rounded-2xl shadow-xl p-8 border border-green-500' : 'bg-white rounded-2xl shadow-xl p-8 border border-gray-200'}>
          {/* Header */}
                    <div className="text-center mb-10">
            <h1 className={theme === 'cyberpunk' ? 'text-4xl font-extrabold text-green-400 mb-3' : 'text-4xl font-extrabold text-gray-900 mb-3'}>Advanced Calculator</h1>
            <button
              onClick={() => setTheme(theme === 'default' ? 'cyberpunk' : 'default')}
              className={theme === 'cyberpunk' ? 'mb-6 px-4 py-2 bg-green-600 text-gray-900 font-bold rounded-full shadow-lg hover:bg-green-500 transition-colors duration-200' : 'mb-6 px-4 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200'}
            >
              Toggle {theme === 'default' ? 'Cyberpunk' : 'Default'} Theme
            </button>
            <div className={theme === 'cyberpunk' ? 'border-b-4 border-green-500 w-20 mx-auto mb-6 rounded-full' : 'border-b-4 border-indigo-500 w-20 mx-auto mb-6 rounded-full'}></div>
            <p className={theme === 'cyberpunk' ? 'text-green-300 text-sm leading-relaxed' : 'text-gray-600 text-sm leading-relaxed'}>Perform a wide range of calculations: basic arithmetic, percentages, square roots, powers, rounding, floor, ceil, factorials, reciprocals, trigonometric functions (sin, cos, tan), logarithms (ln, log10), exponentials, and angle conversions.</p>
          </div>

          {/* Main Content */}
          <div className="mb-6">
             {mode === 'menu' && <CalculatorMenu setMode={setMode} setCurrentStep={setCurrentStep} theme={theme} />}
            {mode === 'step-by-step' && (
                            <StepByStepCalculator
                currentStep={currentStep}
                setOperation={setOperation}
                setCurrentStep={setCurrentStep}
                operation={operation}
                setConversionDirection={setConversionDirection}
                conversionDirection={conversionDirection}
                num1={num1}
                setNum1={setNum1}
                num2={num2}
                setNum2={setNum2}
                handleStepByStepCalculation={() => handleStepByStepCalculation({ num1, num2, operation, expression, conversionDirection }, { setResult, setError })}
                resetCalculator={resetCalculator}
                theme={theme}
              />
            )}
            {mode === 'expression' && (
                            <ExpressionCalculator
                expression={expression}
                setExpression={setExpression}
                handleExpressionCalculation={() => handleExpressionCalculation({ num1, num2, operation, expression, conversionDirection }, { setResult, setError })}
                resetCalculator={resetCalculator}
                theme={theme}
              />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className={theme === 'cyberpunk' ? 'mb-6 p-4 bg-red-900 border border-red-600 text-red-400 rounded-xl text-sm' : 'mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl text-sm'}>
              {error}
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className={theme === 'cyberpunk' ? 'mb-6 p-4 bg-green-900 border border-green-600 text-green-400 rounded-xl text-center' : 'mb-6 p-4 bg-green-50 border border-green-300 text-green-700 rounded-xl text-center'}>
              <div className={theme === 'cyberpunk' ? 'font-semibold text-base text-green-300' : 'font-semibold text-base text-green-800'}>Result:</div>
              <div className={theme === 'cyberpunk' ? 'text-3xl font-bold text-green-200 mt-1' : 'text-3xl font-bold text-green-900 mt-1'}>{result}</div>
            </div>
          )}

          {/* Reset Button (when showing results) */}
          {(result || error) && (
            <div className="text-center">
              <button
                onClick={resetInputsAndResult}
                className={theme === 'cyberpunk' ? 'bg-green-600 hover:bg-green-500 text-gray-900 font-semibold py-3 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md' : 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md'}
              >
                Start New Calculation
              </button>
            </div>
          )}

          {/* Memory Display and Controls */}
          <div className={theme === 'cyberpunk' ? 'mt-10 p-5 bg-gray-700 border border-green-500 rounded-xl shadow-inner' : 'mt-10 p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-inner'}>
            <div className={theme === 'cyberpunk' ? 'font-semibold text-xl text-green-400 mb-4' : 'font-semibold text-xl text-gray-800 mb-4'}>Memory: <span className={theme === 'cyberpunk' ? 'font-bold text-green-300' : 'font-bold text-indigo-600'}>{memory !== null ? memory : 'Empty'}</span></div>
            <div className="grid grid-cols-5 gap-3">
              <button
                onClick={() => handleMemoryClear(setMemory, setError)}
                className={theme === 'cyberpunk' ? 'bg-red-700 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm' : 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm'}
              >
                MC
              </button>
              <button
                onClick={() => handleMemoryRecall(memory, mode, setNum1, setNum2, setExpression, setError)}
                className={theme === 'cyberpunk' ? 'bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm' : 'bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm'}
              >
                MR
              </button>
              <button
                onClick={() => handleMemoryAdd(result, memory, setMemory, setError)}
                className={theme === 'cyberpunk' ? 'bg-green-700 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm' : 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm'}
              >
                M+
              </button>
              <button
                onClick={() => handleMemorySubtract(result, memory, setMemory, setError)}
                className={theme === 'cyberpunk' ? 'bg-yellow-700 hover:bg-yellow-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm' : 'bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm'}
              >
                M-
              </button>
              <button
                onClick={() => handleMemoryStore(result, setMemory, setError)}
                className={theme === 'cyberpunk' ? 'bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm' : 'bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-sm'}
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