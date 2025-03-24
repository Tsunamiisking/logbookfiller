"use client"

import { useState } from "react"
import { generateLogbookEntry } from "../utils/API"
import { testGetData } from "../utils/getDataTest"
import { FaClipboard, FaBook, FaClock, FaMagic, FaSync } from "react-icons/fa"

const MainSection = () => {
  const [keywords, setKeywords] = useState("")
  const [entryType, setEntryType] = useState("daily")
  const [wordCount, setWordCount] = useState(200)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [history, setHistory] = useState([])

  // console.log(testGetData());

  // Sample entry types for logbook
  const entryTypes = [
    { id: "daily", name: "Daily Activity" },
    { id: "project", name: "Project Update" },
    { id: "reflection", name: "Reflection" },
    { id: "learning", name: "Learning Summary" },
    { id: "meeting", name: "Meeting Notes" },
  ]

  // Mock function to simulate AI text generation
  const generateText = async () => {
    if (!keywords.trim()) {
      alert("Please enter at least one keyword")
      return
    }

    setIsGenerating(true)

      const keywordArray = keywords.split(",").map((kw) => kw.trim());

      const entry = await generateLogbookEntry(keywordArray, entryType);
      setGeneratedText(entry);
      console.log(entry);
      setIsGenerating(false);

      // Add to history
      setHistory((prev) => [
        // {
        //   id: Date.now(),
        //   keywords,
        //   type: entryTypes.find((t) => t.id === entryType).name,
        //   preview: entry.substring(0, 60) + "...",
        // },
        // ...prev.slice(0, 4),
      ]);
   
}
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    alert("Text copied to clipboard!")
  }

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
                <select id="entryType" value={entryType} onChange={(e) => setEntryType(e.target.value)}>
                  {entryTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="wordCount">Word Count</label>
                <select id="wordCount" value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))}>
                  <option value={100}>Short (~100 words)</option>
                  <option value={200}>Medium (~200 words)</option>
                  <option value={400}>Long (~400 words)</option>
                </select>
              </div>
            </div>

            <button className="generate-btn" onClick={generateText} disabled={isGenerating}>
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
              {generatedText && (
                <button className="copy-btn" onClick={copyToClipboard}>
                  <FaClipboard className="icon" /> Copy
                </button>
              )}
            </div>

            <div className="output-content">
              {generatedText ? (
                <div className="generated-text">
                  {generatedText.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              ) : (
                <div className="placeholder-text">
                  <FaBook className="big-icon" />
                  <p>Your generated logbook entry will appear here</p>
                  <p className="hint">Enter keywords and click "Generate Entry" to start</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <h2>
              <FaClock className="icon" /> Recent Generations
            </h2>
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-content">
                    <span className="history-type">{item.type}</span>
                    <p className="history-preview">{item.preview}</p>
                    <p className="history-keywords">Keywords: {item.keywords}</p>
                  </div>
                  <button
                    className="history-load-btn"
                    onClick={() => {
                      setKeywords(item.keywords)
                      setEntryType(entryTypes.find((t) => t.name === item.type).id)
                      generateText()
                    }}
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
  )
}

export default MainSection



    // Simulate API call delay
//     setTimeout(() => {
//       const keywordList = keywords
//         .split(",")
//         .map((k) => k.trim())
//         .join(", ")
//       const sampleText = `This is a generated ${entryType} entry based on your keywords: ${keywordList}. 
      
// Today I worked on implementing several key features for our project. I focused primarily on ${keywordList}. The process involved researching best practices, collaborating with team members, and testing various approaches. I encountered some challenges with integration but managed to resolve them by applying the concepts we learned in class last week.

// Moving forward, I plan to expand on these concepts and explore how they can be applied to other aspects of our project. This experience has deepened my understanding of the subject matter and improved my problem-solving skills.`

//       setGeneratedText(sampleText)
//       setIsGenerating(false)

//       // Add to history
//       setHistory((prev) => [
//         {
//           id: Date.now(),
//           keywords: keywords,
//           type: entryTypes.find((t) => t.id === entryType).name,
//           preview: sampleText.substring(0, 60) + "...",
//         },
//         ...prev.slice(0, 4),
//       ])
//     }, 1500)