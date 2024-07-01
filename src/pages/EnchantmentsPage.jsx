import enchantmentsList from "../data/enchantments.json";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";

EnchantmentsPage.propTypes = {
    imagesUrls: PropTypes.object.isRequired,
};

function EnchantmentsPage({ imagesUrls }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = enchantmentsList.filter((item) =>
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full max-h-dvh scroll-auto overflow-auto h-auto">
            <div className="flex items-center justify-center mb-4 mt-4">
                <Link to="/">
                    <h1 className="font-mcFont text-6xl text-slate-100 textShadow">
                        Enchanted book List
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
                    {filteredItems.map((item, index) => (
                        <ItemCard
                            key={index}
                            item={item}
                            image={imagesUrls["enchanted_book"]}
                            handleClick={() => console.log("Item click!")}
                        ></ItemCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    image: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
};

function ItemCard({ item, image, handleClick }) {
    return (
        <div
            className="flex flex-col w-48 h-64 items-center justify-center p-4 rounded-md border border-gray-300 shadow-lg hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105
        bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-50 via-yellow-50 to-amber-200"
            onClick={handleClick}
        >
            <img src={image} alt={item.displayName} />
            <h2 className="text-center font-mcFont text-3xl">
                {item.displayName}
            </h2>
            <p>Max lvl: {item.maxLevel}</p>
            <p>Treasure only: {item.treasureOnly ? "Yes" : "No"}</p>
            <p>Curse: {item.curse ? "Yes" : "No"}</p>
            <p>Tradeable: {item.tradeable ? "Yes" : "No"}</p>
        </div>
    );
}

export default EnchantmentsPage;
