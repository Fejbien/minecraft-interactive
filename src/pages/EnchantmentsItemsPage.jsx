import enchantmentsList from "../data/enchantments.json";
import itemsList from "../data/items.json";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";

// TODO:
// 1. Add better styling to the page
// 2. Add every item entire an imagr to check on
// 3. Add better text for the avaiable enchantments

function EnchantmentsItemsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter items based on search query
    const filteredItems = itemsList.filter(
        (item) =>
            item.enchantCategories !== undefined &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
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
        <div className="flex flex-col w-full max-h-dvh scroll-auto overflow-auto h-auto text-white">
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
                    className="input bg-gray-800 border border-gray-600 text-white p-2 rounded-md"
                    placeholder="Search items..."
                />
            </div>
            <ul className="suggestions mt-4">
                {filteredItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className="suggestion-item text-center p-2 hover:bg-gray-700 cursor-pointer"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            {selectedItem && (
                <div className="mt-4">
                    <h2 className="text-center">
                        Available Enchantments for {selectedItem.name}:
                    </h2>
                    <ul>
                        {enchantmentsForSelectedItem.map((enchantment) => (
                            <li key={enchantment.id} className="p-1">
                                {enchantment.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EnchantmentsItemsPage;
