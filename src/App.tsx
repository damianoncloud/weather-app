import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  return (
    <>
      <h1 className="text-white mb-8">Weather App</h1>
      <div className="flex items-center gap-2">
        <Input placeholder="Search for cities" />
        <Button />
      </div>
    </>
  );
}

export default App;
