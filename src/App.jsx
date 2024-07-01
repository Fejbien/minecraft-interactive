import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import itemsList from "./data/items.json";
import bgImage from "./assets/backgroundDirt.png";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

import ItemsPage from "./pages/ItemsPage";
import FoodPage from "./pages/FoodPage";
import EnchantmentsPage from "./pages/EnchantmentsPage";
import EnchantmentsItemsPage from "./pages/EnchantmentsItemsPage";
import LitematicaResourcesPage from "./pages/LitematicaResourcesReaderPage";

function App() {
    const [imagesUrls, setImagesUrls] = useState({});

    useEffect(() => {
        const loadItemIcons = async () => {
            try {
                const icons = {};
                for (const item of itemsList) {
                    const response = await fetch(
                        `../itemIcons/${item.name}.png`
                    );
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = URL.createObjectURL(blob);
                        icons[item.name] = url;
                        setImagesUrls((prevUrls) => ({
                            ...prevUrls,
                            [item.name]: url,
                        }));
                    }
                }
            } catch (error) {
                console.error("Error loading item icons:", error);
            }
        };

        loadItemIcons();
    }, []);

    return (
        <div
            className="min-h-dvh min-w-[100dvw] fixed bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                    <Route
                        path="/items"
                        element={<ItemsPage imagesUrls={imagesUrls} />}
                    />
                    <Route
                        path="/foods"
                        element={<FoodPage imagesUrls={imagesUrls} />}
                    />
                    <Route
                        path="/enchants"
                        element={<EnchantmentsPage imagesUrls={imagesUrls} />}
                    />
                    <Route
                        path="/enchantsItems"
                        element={
                            <EnchantmentsItemsPage imagesUrls={imagesUrls} />
                        }
                    />
                    <Route
                        path="/litematicaResources"
                        element={
                            <LitematicaResourcesPage imagesUrls={imagesUrls} />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
