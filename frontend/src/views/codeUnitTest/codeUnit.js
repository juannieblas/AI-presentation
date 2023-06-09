import React, { useState } from 'react';
import './codeUnit.css'; // Import the CSS file for styling

function CodeUnit() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/code/unit_test_cases', {
        method: 'POST',
        body: JSON.stringify({ code: input1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.text();

      setInput2(data);
    } catch (error) {
      console.error(error);
      setInput2('Error occurred');
    }
  };



  const handleCopy = () => {
    navigator.clipboard.writeText(input2);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="copy-module">
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={input1}
          placeholder="Enter text"
          onChange={(e) => setInput1(e.target.value)}
          rows={10} // Set the number of rows to 10
        />
        <br/><br/>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <br/><br/>
      <textarea
        type="text"
        value={input2}
        placeholder="Response"
        readOnly
        rows={10} // Set the number of rows to 10
      />
      <br/><br/>
      <button className="copy-button" onClick={handleCopy}>
        Copy Response
      </button>
    </div>
  );
}

export default CodeUnit;
