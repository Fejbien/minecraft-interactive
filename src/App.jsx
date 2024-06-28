import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import bgImage from "./assets/backgroundDirt.png";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

import ItemsPage from "./pages/ItemsPage";

function App() {
    return (
        <div
            className="min-h-dvh min-w-[100dvw] fixed bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/items" element={<ItemsPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
