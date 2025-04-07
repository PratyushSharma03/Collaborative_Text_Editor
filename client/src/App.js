import React from "react";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>
        📝 Collaborative Text Editor
      </h1>
      <TextEditor />
    </div>
  );
}

export default App;
