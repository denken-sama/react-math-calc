import React from 'react';

interface CalculatorMenuProps {
  setMode: (mode: 'menu' | 'step-by-step' | 'expression') => void;
  setCurrentStep: (step: number) => void;
}

const CalculatorMenu: React.FC<CalculatorMenuProps> = ({ setMode, setCurrentStep }) => {
  return (
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
};

export default CalculatorMenu;