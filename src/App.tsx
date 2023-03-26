import React from "react";
import "./App.css";
import CustomLayout from "./components/CustomLayout";
import SearchUser from "./pages/SearchUser";

function App() {
  return (
    <div className="App">
      <CustomLayout>
        <SearchUser />
      </CustomLayout>
    </div>
  );
}

export default App;
