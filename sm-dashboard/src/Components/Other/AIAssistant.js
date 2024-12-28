import React, { useState } from 'react';
import { generateContent } from './gemini';
import '../../Styles/AIAssistant.css';

const AIAssistant = () => {
  const [inputText, setInputText] = useState('');
  const [contentType, setContentType] = useState('description');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to generate content.');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const content = await generateContent(inputText, contentType);
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-container">
      <h2>AI Content Assistant</h2>
      <div className="content-type-selector">
        <button 
          className={`type-button ${contentType === 'description' ? 'active' : ''}`}
          onClick={() => setContentType('description')}
        >
          Description
        </button>
        <button 
          className={`type-button ${contentType === 'caption' ? 'active' : ''}`}
          onClick={() => setContentType('caption')}
        >
          Caption
        </button>
        <button 
          className={`type-button ${contentType === 'slogan' ? 'active' : ''}`}
          onClick={() => setContentType('slogan')}
        >
          Slogan
        </button>
      </div>

      <div className="input-section">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your content idea or topic..."
          rows={4}
        />
        <button 
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {generatedContent && (
        <div className="output-section">
          <h3>Generated Content:</h3>
          <div className="generated-content">
            {generatedContent}
          </div>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(generatedContent)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
