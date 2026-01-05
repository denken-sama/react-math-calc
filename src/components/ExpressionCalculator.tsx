import React from 'react';

interface ExpressionCalculatorProps {
  expression: string;
  setExpression: (expr: string) => void;
  handleExpressionCalculation: () => void;
  resetCalculator: () => void;
  theme: string;
}

const ExpressionCalculator: React.FC<ExpressionCalculatorProps> = ({
  expression,
  setExpression,
  handleExpressionCalculation,
  resetCalculator,
  theme,
}) => {
  return (
    <div className="text-center">
      <h3 className={theme === 'cyberpunk' ? 'text-2xl font-bold mb-8 text-green-400' : 'text-2xl font-bold mb-8 text-gray-800'}>Enter Your Expression:</h3>
      <div className="space-y-5">
        <div>
          <label className={theme === 'cyberpunk' ? 'block text-green-300 font-medium mb-2 text-left' : 'block text-gray-700 font-medium mb-2 text-left'}>
            Input your mathematical expression (e.g., 5 + 3 * 2) or unary operation (e.g., sqrt 9, reciprocal 5):
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className={theme === 'cyberpunk' ? 'w-full px-4 py-3 border border-green-500 bg-gray-800 text-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm' : 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'}
            placeholder="e.g., 10 / 2 + (3 * 4) or sin 90"
            onKeyPress={(e) => e.key === 'Enter' && handleExpressionCalculation()}
          />
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleExpressionCalculation}
            className={theme === 'cyberpunk' ? 'flex-1 bg-green-600 hover:bg-green-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md' : 'flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md'}
          >
            Evaluate Expression
          </button>
          <button
            onClick={resetCalculator}
            className={theme === 'cyberpunk' ? 'flex-1 bg-gray-700 hover:bg-gray-600 text-green-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md' : 'flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md'}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpressionCalculator;