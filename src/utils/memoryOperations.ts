export const handleMemoryClear = (setMemory: React.Dispatch<React.SetStateAction<number | null>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
  setMemory(null);
  setError('');
};

export const handleMemoryRecall = (memory: number | null, mode: string, setNum1: React.Dispatch<React.SetStateAction<string>>, setNum2: React.Dispatch<React.SetStateAction<string>>, setExpression: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
  if (memory !== null) {
    if (mode === 'step-by-step') {
      setNum1(memory.toString());
      setNum2('');
    } else if (mode === 'expression') {
      setExpression(memory.toString());
    }
    setError('');
  } else {
    setError('Memory is empty!');
  }
};

export const handleMemoryAdd = (result: string, memory: number | null, setMemory: React.Dispatch<React.SetStateAction<number | null>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
  if (result && !isNaN(parseFloat(result))) {
    const currentResult = parseFloat(result);
    setMemory(prevMemory => (prevMemory !== null ? prevMemory + currentResult : currentResult));
    setError('');
  } else {
    setError('No valid result to add to memory!');
  }
};

export const handleMemorySubtract = (result: string, memory: number | null, setMemory: React.Dispatch<React.SetStateAction<number | null>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
  if (result && !isNaN(parseFloat(result))) {
    const currentResult = parseFloat(result);
    setMemory(prevMemory => (prevMemory !== null ? prevMemory - currentResult : -currentResult));
    setError('');
  } else {
    setError('No valid result to subtract from memory!');
  }
};

export const handleMemoryStore = (result: string, setMemory: React.Dispatch<React.SetStateAction<number | null>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
  if (result && !isNaN(parseFloat(result))) {
    setMemory(parseFloat(result));
    setError('');
  } else {
    setError('No valid result to store in memory!');
  }
};