import { Link } from "react-router-dom";
import foodsList from "../data/foods.json";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function FoodPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [imagesUrls, setImagesUrls] = useState({});

    useEffect(() => {
        const loadItemIcons = async () => {
            try {
                const icons = {};
                for (const item of foodsList) {
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

    const filteredItems = foodsList.filter((item) =>
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredItems);

    return (
        <div className="flex flex-col w-full max-h-dvh scroll-auto overflow-auto h-auto">
            <div className="flex items-center justify-center mb-4 mt-4">
                <Link to="/">
                    <h1 className="font-mcFont text-6xl text-slate-100 textShadow">
                        Food list
                    </h1>
                </Link>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="h-5 w-[0.4rem] bg-violet-400"></div>
                <div className="h-2 w-3/5 bg-gradient-to-r from-yellow-100 via-yellow-50 to-amber-100"></div>
                <div className="h-5 w-[0.4rem] bg-violet-400"></div>
            </div>
            <div className="mt-4 flex justify-center w-full">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md min-w-96 w-2/5"
                />
            </div>
            <div className="mt-4 flex w-full flex-row flex-grow flex-wrap justify-center gap-4">
                {filteredItems.map((food, index) => (
                    <FoodCard
                        key={index}
                        item={food}
                        image={imagesUrls[food.name]}
                        handleClick={() => console.log("Item click!")}
                    ></FoodCard>
                ))}
            </div>
        </div>
    );
}

FoodCard.propTypes = {
    item: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

function FoodCard({ item, image, handleClick }) {
    return (
        <div
            onClick={handleClick}
            className="flex flex-col w-48 min-h-48 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center p-4 rounded-md border border-gray-300 shadow-lg hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
            <img
                src={image}
                alt={item.displayName}
                className="w-24 h-24 mt-4"
            />
            <h2 className="text-center text-2xl font-mcFont text-slate-900 flex justify-center items-center">
                {item.displayName}
            </h2>
            <p>
                <span className="text-slate-700">
                    Saturation: &nbsp;
                    {item.saturation}
                </span>
            </p>
            <p>
                <span className="text-slate-700">
                    Hunger points: &nbsp;
                    {item.foodPoints}
                </span>
            </p>
        </div>
    );
}

export default FoodPage;
