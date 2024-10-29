import { useState } from "react";
import "./App.css";
import Input from "./components/Input";

function App() {
  return (
    <>
      <h1 className="mb-8">Weather App</h1>
      <Input placeholder="Search for cities" />
    </>
  );
}

export default App;
