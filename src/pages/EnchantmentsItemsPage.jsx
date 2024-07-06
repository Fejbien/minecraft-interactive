import enchantmentsList from "../data/enchantments.json";
import itemsList from "../data/items.json";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";
import { useState } from "react";

import PropTypes from "prop-types";

// TODO:
// 1. Add better styling to the page
// 2. Add every item entire an imagr to check on
// 3. Add better text for the avaiable enchantments
// 4. Add a way to click on the enchantment and see more details (hide current info beside max level)

function EnchantmentsItemsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter items based on search query
    const filteredItems = itemsList.filter(
        (item) =>
            item.enchantCategories !== undefined &&
            item.displayName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) &&
            searchQuery != ""
    );

    // Handle selecting an item
    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchQuery(item.displayName); // Update the search query to the selected item's name
    };

    // Find enchantments for the selected item
    const enchantmentsForSelectedItem = selectedItem
        ? enchantmentsList.filter((enchantment) =>
              selectedItem.enchantCategories.includes(enchantment.category)
          )
        : [];

    return (
        <div className="flex flex-col w-full max-h-dvh h-dvh scroll-auto overflow-auto text-white">
            <div className="flex items-center justify-center mb-4 mt-4">
                <Link to="/">
                    <h1 className="font-mcFont text-6xl text-center textShadow">
                        Enchanted items List
                    </h1>
                </Link>
            </div>
            <HorizontalEndRodBar />
            <div className="flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedItem(null); // Reset selected item when search query changes
                    }}
                    className="input bg-gray-800 border border-gray-600 text-white p-2 mt-6 rounded-md"
                    placeholder="Search items..."
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="suggestions mt-4 flex flex-row flex-wrap gap-4 w-3/5 items-center justify-center">
                    {filteredItems.map((item) => (
                        <SuggestionItem
                            key={item.name}
                            item={item}
                            image={`/itemIcons/${item.name}.png`}
                            handleClick={() => handleSelectItem(item)}
                        />
                    ))}
                </div>
            </div>
            {selectedItem && (
                <div className="mt-4 flex flex-col w-full justify-center items-center">
                    <h2 className="text-center">
                        Available Enchantments for {selectedItem.name}:
                    </h2>
                    <div className="flex flex-col w-full justify-center items-center gap-4">
                        {enchantmentsForSelectedItem.map((enchantment) => (
                            <EnchantTile
                                key={enchantment.id}
                                enchant={enchantment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

SuggestionItem.propTypes = {
    item: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    image: PropTypes.string,
};

function SuggestionItem({ item, handleClick, image }) {
    return (
        <div
            onClick={handleClick}
            className="flex flex-row justify-center items-center
            suggestion-item text-center p-2 text-slate-800 font-mcFont cursor-pointer bg-slate-50 rounded-md text-4xl
            hover:bg-slate-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
            <div
                style={{ backgroundImage: `url(${image})` }}
                className="w-12 h-12 mr-4"
            />
            {item.displayName}
        </div>
    );
}

EnchantTile.propTypes = {
    enchant: PropTypes.object.isRequired,
};

function EnchantTile({ enchant }) {
    return (
        <div className="text-slate-900 bg-gray-100 w-3/5 flex flex-row items-center justify-evenly p-4 rounded-md border border-gray-300 shadow-lg hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-center font-mcFont text-4xl">
                {enchant.displayName}
            </h2>
            <p className="">Max lvl: {enchant.maxLevel}</p>
            <p>Treasure only: {enchant.treasureOnly ? "Yes" : "No"}</p>
            <p>Curse: {enchant.curse ? "Yes" : "No"}</p>
            <p>Tradeable: {enchant.tradeable ? "Yes" : "No"}</p>
            {/*<button onClick={() => handleClick(item)}>Click me</button>*/}
        </div>
    );
}

export default EnchantmentsItemsPage;
