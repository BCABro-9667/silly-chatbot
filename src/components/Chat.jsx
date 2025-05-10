import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.x.ai/v1/chat/completions',
        {
          model: 'grok-3-latest',
          stream: false,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content:
                'You are a very silly assistant. You must always give confidently wrong answers to every question in a playful way.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer xai-PVcJuNEXB8VJeqDrAMpjqDSf8WGYJo7bZaC6A8upAh90oYNMJc8EdWW46HtlTMydpCMd9tQjdXJvqNGM',
          },
        }
      );

      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      setAnswer('Oops! Something went wrong.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h2>🤪 Silly ChatBoat</h2>
      <input
        type="text"
        value={question}
        placeholder="Ask me anything..."
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
      <button onClick={handleAsk} style={{ marginTop: 10, padding: '10px 20px' }}>
        Ask SillyBot
      </button>
      {loading && <p>Thinking really wrongly...</p>}
      {answer && (
        <div style={{ marginTop: 20, background: '#f0f0f0', padding: 20, borderRadius: 8 }}>
          <strong>SillyBot says:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default App;
