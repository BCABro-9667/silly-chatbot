import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faSun, faMoon, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('themePreference');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    // Save theme preference to localStorage
    localStorage.setItem('themePreference', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    try {
      const response = await axios.post('https://chatbaotbackend.onrender.com/api/sillybot', {
        question,
      });
      setAnswer(response.data.answer || 'No response from SillyBot!');
      setQuestion(""); // Reset input after sending
    } catch (error) {
      setAnswer(error.response?.data?.error || 'Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <nav>
        <div className="nav-left">
          <h1><FontAwesomeIcon icon={faRobot} /> SillyBot</h1>
        </div>
        <div className="nav-right">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="toggle-btn"
          >
            {darkMode ? (
              <>
                <FontAwesomeIcon icon={faSun} /> Light
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMoon} /> Dark
              </>
            )}
          </button>
        </div>
      </nav>

      <div className="chat-container">
        <div className="bot-image-container">
          <img src="https://res.cloudinary.com/dsugarjot/image/upload/v1746868658/ChatGPT_Image_May_10_2025_02_47_15_PM_ejosry.png" alt="SillyBot" className="bot-image" />
        </div>
        
        <div className="chat-area">
          <div className="chat-box">
            {/* <div className="answer1">
Ask me anything 🤖🧠            </div> */}
            {answer && (
              <div className="bot-response">
                <strong><FontAwesomeIcon icon={faRobot} /> SillyBot:</strong>
                <p>{answer}</p>
              </div>
            )}
          </div>
          
          <div className="input-area">
            <input
              type="text"
              value={question}
              placeholder="Ask me anything..."
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="ask-btn"
            >
              {loading ? (
                "🤔..."
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;