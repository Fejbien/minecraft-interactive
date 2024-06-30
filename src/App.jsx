import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import bgImage from "./assets/backgroundDirt.png";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

import ItemsPage from "./pages/ItemsPage";
import FoodPage from "./pages/FoodPage";
import EnchantmentsPage from "./pages/EnchantmentsPage";
import EnchantmentsItemsPage from "./pages/EnchantmentsItemsPage";

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
                    <Route path="/foods" element={<FoodPage />} />
                    <Route path="/enchants" element={<EnchantmentsPage />} />
                    <Route
                        path="/enchantsItems"
                        element={<EnchantmentsItemsPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
