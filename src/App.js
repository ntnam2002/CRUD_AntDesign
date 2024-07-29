import logo from "./logo.svg";
import "./App.css";
import User from "./components/userTable";
import { Routes, Route } from "react-router-dom";
function App() {
    return (
        <Routes>
            <Route path="/" element={<User />} />-
        </Routes>
    );
}

export default App;
