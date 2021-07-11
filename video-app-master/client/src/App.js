import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Video from "./videoComponent";

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Video App</h1>
      </header>
      <main>
        <Video />
      </main>
    </div>
  );
};

export default App;
