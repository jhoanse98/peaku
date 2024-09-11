import React from "react";
/** Styles */
import "./App.css";
import Consume from "./components/Consume";
import Losts from "./components/Losts";
import Costs from "./components/Costs";
import LostsFetched from "./components/LostsFetched";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Consume />
      <Costs />
      <Losts />
      <LostsFetched />
    </>
  );
};

export default App;
