import enchantmentsList from "../data/enchantments.json";
import itemsList from "../data/items.json";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";
import { useState } from "react";

import PropTypes from "prop-types";

// TODO:
// 1. Add more information to the enchantment tile

function EnchantmentsItemsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredItems = itemsList.filter(
        (item) =>
            item.enchantCategories !== undefined &&
            item.displayName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) &&
            searchQuery != ""
    );

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchQuery(item.displayName);
    };

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
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedItem(null); // Reset selected item when search query changes
                    }}
                    className="p-2 border border-gray-300 rounded-md min-w-96 w-2/5 text-black"
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
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            className=" text-slate-900 bg-gray-100 w-3/5 flex flex-col items-center justify-evenly p-4 rounded-md border border-gray-300 shadow-lg 
            hover:bg-gray-200 cursor-pointer"
            onClick={handleExpand}
            style={{
                transition:
                    "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
                overflow: "hidden",
                maxHeight: expanded ? "500px" : "150px",
            }}
        >
            <div className="w-full flex flex-row items-center justify-evenly">
                <h2 className="text-center font-mcFont text-4xl w-2/5">
                    {enchant.displayName}
                </h2>
                <div className="flex flex-row w-3/5">
                    <p className="text-center w-1/4">
                        Max lvl: {enchant.maxLevel}
                    </p>
                    <p className="text-center w-1/4">
                        Treasure only: {enchant.treasureOnly ? "Yes" : "No"}
                    </p>
                    <p className="text-center w-1/4">
                        Curse: {enchant.curse ? "Yes" : "No"}
                    </p>
                    <p className="text-center w-1/4">
                        Tradeable: {enchant.tradeable ? "Yes" : "No"}
                    </p>
                </div>
            </div>
            {expanded && (
                <div
                    className={`flex flex-col mt-4 w-full p-6 transition-all duration-300 ease-in-out ${
                        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                >
                    {!!enchant.exclude.length && (
                        <p>
                            The enchant can not be combineded with:
                            <ul className="list-disc">
                                {enchant.exclude.map((excluded, id) => {
                                    const enchantDisplayName =
                                        enchantmentsList.find(
                                            (enchantment) =>
                                                enchantment.name === excluded
                                        ).displayName;
                                    return (
                                        <li key={id}>{enchantDisplayName}</li>
                                    );
                                })}
                            </ul>
                        </p>
                    )}
                    {!enchant.exclude.length && (
                        <p>
                            This enchant can be combined with any other enchant
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default EnchantmentsItemsPage;
