import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("Empty");
  const [loading, setLoading] = useState(false);

  const handleButton = () => {
    const trimText = text.trim();
    if (trimText === "") return; 
    setLoading(true);
    axios
      .post("http://localhost:8080/api/getResponse", { text: trimText })
      .then((response) => {
        setAnswer(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setAnswer("An error occurred.");
      })
      .finally(() => setLoading(false)); 
  };

  const clearInput = () => {
    setText("");
    setAnswer("Empty");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex flex-col space-y-4">
          <div className="text-sm font-medium text-gray-700">Response:</div>
          <div
            className="p-4 bg-gray-100 rounded-lg text-gray-800"
            style={{ minHeight: "100px" }}
          >
            
            <div className="flex flex-col space-y-2">
              {answer !== "Empty" ? (
                <div className="text-gray-800 bg-blue-100 rounded-lg p-2 max-w-xs">
                  {answer}
                </div>
              ) : (
                <div className="text-gray-500">Ask me something!</div>
              )}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">Enter your question:</div>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your question here..."
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleButton}
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            <button
              onClick={clearInput}
              className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
