import React, { useState } from 'react';
import { asciiToBinary } from '../utils/binary/asciiToBinary';

const AsciiToBinaryConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      setBinary(asciiToBinary(input));
      setError('');
    } catch (conversionError) {
      setBinary('');
      setError(conversionError instanceof Error ? conversionError.message : 'Unable to convert the supplied value.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        ASCII to Binary Converter
      </h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ASCII (e.g. 72 101)"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />

      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors"
      >
        Convert
      </button>

      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}

      {binary && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 text-sm rounded-xl text-gray-800 dark:text-white break-words">
          <strong>Binary:</strong> {binary}
        </div>
      )}
    </div>
  );
};

export default AsciiToBinaryConverter;
