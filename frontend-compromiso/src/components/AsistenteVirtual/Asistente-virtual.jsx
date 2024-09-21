// AsistenteVirtual.js
import React, { useState, useEffect } from 'react';
import predict from '../../ai.js';

const AsistenteVirtual = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const handleInput = async () => {
      const output = await predict(input);
      setOutput(output);
    };
    handleInput();
  }, [input]);

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Output: {output}</p>
    </div>
  );
};

export default AsistenteVirtual;