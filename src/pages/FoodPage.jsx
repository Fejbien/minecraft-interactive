import { Link } from "react-router-dom";
import foodsList from "../data/foods.json";
import { useState } from "react";
import PropTypes from "prop-types";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";

function FoodPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = foodsList.filter((item) =>
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full max-h-dvh scroll-auto overflow-auto h-auto">
            <div className="flex items-center justify-center mb-4 mt-4">
                <Link to="/">
                    <h1 className="font-mcFont text-6xl text-slate-100 textShadow">
                        Food list
                    </h1>
                </Link>
            </div>
            <HorizontalEndRodBar />
            <div className="mt-4 flex justify-center w-full">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md min-w-96 w-2/5"
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="mt-4 flex max-w-[94%] flex-row flex-grow flex-wrap justify-center gap-4">
                    {filteredItems.map((food, index) => (
                        <FoodCard
                            key={index}
                            item={food}
                            image={`/itemIcons/${food.name}.png`}
                        ></FoodCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

FoodCard.propTypes = {
    item: PropTypes.object.isRequired,
    image: PropTypes.string,
};

function FoodCard({ item, image }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            onClick={toggleExpand}
            className={`flex flex-col ${
                isExpanded ? "w-64 min-h-64" : "w-48 min-h-48"
            } items-center justify-center p-4 rounded-md border border-gray-300 shadow-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105
        bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-50 via-yellow-50 to-amber-200`}
        >
            <div
                style={{ backgroundImage: `url(${image})` }}
                className="w-24 h-24 mt-4 bg-cover"
            />
            <h2 className="text-center text-2xl font-mcFont text-slate-900 flex justify-center items-center">
                {item.displayName}
            </h2>
            <p>
                <span className="text-slate-800 text-xl">
                    Saturation: &nbsp;
                    {item.saturation}
                </span>
            </p>
            <p>
                <span className="text-slate-800 text-xl">
                    Hunger points: &nbsp;
                    {item.foodPoints}
                </span>
            </p>
            {isExpanded && (
                <div className="text-slate-800 mt-4 text-center text-xl">
                    <p>Stack size: {item.stackSize}</p>
                    <p>Effective quality: {item.effectiveQuality}</p>
                    <p>Saturation ratio: {item.saturationRatio}</p>
                </div>
            )}
        </div>
    );
}

export default FoodPage;
