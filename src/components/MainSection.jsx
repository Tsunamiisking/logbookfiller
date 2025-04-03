"use client";
import { useState, useEffect } from "react";
import { generateLogbookEntry } from "../utils/API";
import { FaClipboard, FaBook, FaClock, FaMagic, FaSync } from "react-icons/fa";

const MainSection = () => {
  const [keywords, setKeywords] = useState("");
  const [entryType, setEntryType] = useState("daily");
  const [wordCount, setWordCount] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEntry, setGeneratedEntry] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("logbookHistory")) || [];
    setHistory(savedHistory);
    console.log("Loaded history from localStorage:", savedHistory);
  }, [generatedEntry]);

  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString(); // Example: "3/24/2025, 10:30 AM"
  };

  // Function to save entry to local storage
  const saveToHistory = (entryText) => {
    const newEntry = {
      id: Date.now(), // Unique ID based on timestamp
      timestamp: getFormattedDate(),
      text: entryText,
      type: entryType,
      keywords
    };

    const updatedHistory = [newEntry, ...history]; // Add new entry at the top
    setHistory(updatedHistory);
    localStorage.setItem("logbookHistory", JSON.stringify(updatedHistory));
  };

  const entryTypes = [
    { id: "daily", name: "Daily Activity" },
    { id: "project", name: "Project Update" },
    { id: "reflection", name: "Reflection" },
    { id: "learning", name: "Learning Summary" },
    { id: "meeting", name: "Meeting Notes" },
  ];

  const copyToClipboard = () => {
    if (generatedEntry) {
      navigator.clipboard.writeText(generatedEntry);
      alert("Text copied to clipboard!");
    }
  };

  const loadHistoryItem = (item) => {
    setGeneratedEntry(item.fullEntry);
    setKeywords(item.keywords);
    setEntryType(entryTypes.find((t) => t.name === item.type)?.id || "daily");
  };

  const generateText = async () => {
    if (!keywords.trim()) {
      alert("Please enter at least one keyword");
      return;
    }

    setIsGenerating(true);
    setGeneratedEntry(null); // Clear previous entry

    try {
      const keywordArray = keywords.split(",").map((kw) => kw.trim());
      const entry = await generateLogbookEntry(keywordArray, entryType);

      if (entry) {
        // Ensure entry is a string
        const entryText = Array.isArray(entry) ? entry.join(" ") : entry;
        setGeneratedEntry(entryText);
        saveToHistory(entryText); // Pass entryText to saveToHistory

        // Add to history with safe string handling
        setHistory((prev) => [
          {
            id: Date.now(),
            keywords,
            type: entryTypes.find((t) => t.id === entryType)?.name || "Unknown",
            preview:
              entryText.length > 60
                ? `${entryText.substring(0, 60)}...`
                : entryText,
            fullEntry: entryText,
          },
          ...prev.slice(0, 4),
        ]);
      }
    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate entry. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="main-section">
      <div className="container">
        <div className="app-header">
          <h1>LogBook AI Assistant</h1>
          <p>Generate professional logbook entries with AI</p>
        </div>

        <div className="content-area">
          <div className="input-section">
            <div className="form-group">
              <label htmlFor="keywords">Keywords</label>
              <textarea
                id="keywords"
                placeholder="Enter keywords separated by commas (e.g., database design, user authentication, API integration)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="entryType">Entry Type</label>
                <select
                  id="entryType"
                  value={entryType}
                  onChange={(e) => setEntryType(e.target.value)}
                >
                  {entryTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="wordCount">Word Count</label>
                <select
                  id="wordCount"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                >
                  <option value={100}>Short (~100 words)</option>
                  <option value={200}>Medium (~200 words)</option>
                  <option value={400}>Long (~400 words)</option>
                </select>
              </div>
            </div>

            <button
              className="generate-btn"
              onClick={generateText}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <FaSync className="icon spinning" /> Generating...
                </>
              ) : (
                <>
                  <FaMagic className="icon" /> Generate Entry
                </>
              )}
            </button>
          </div>

          <div className="output-section">
            <div className="output-header">
              <h2>Generated Text</h2>
              {generatedEntry && (
                <button className="copy-btn" onClick={() => copyToClipboard()}>
                  <FaClipboard className="icon" /> Copy
                </button>
              )}
            </div>

            <div className="output-content">
              {generatedEntry ? (
                <div className="generated-text">
                  {generatedEntry
                    .split("\n")
                    .map((line, index) =>
                      line.trim() ? (
                        <p key={index}>{line}</p>
                      ) : (
                        <br key={index} />
                      )
                    )}
                </div>
              ) : (
                <div className="placeholder-text">
                  <FaBook className="big-icon" />
                  <p>Your generated logbook entry will appear here</p>
                  <p className="hint">
                    Enter keywords and click "Generate Entry" to start
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {history && (
          <div className="history-section">
            <h2>
              <FaClock className="icon" /> Recent Generations
            </h2>
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-content">
                    <span className="history-type">{item.type}</span>
                    {/* <p className="history-preview">{item.text}</p> */}
                    <p className="history-keywords">
                      Keywords: {item.keywords}
                    </p>
                  </div>
                  <button
                    className="history-load-btn"
                    onClick={() => loadHistoryItem(item)}
                  >
                    <FaSync className="icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSection;
