import React from "react";
/** Styles */
import "./App.css";
import Consume from "./components/Consume";
import Losts from "./components/Losts";
import Costs from "./components/Costs";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Consume />
      <Costs />
      <Losts />
    </>
  );
};

export default App;
