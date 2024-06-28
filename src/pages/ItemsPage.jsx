import itemsList from "../data/items.json";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ItemsPage() {
    const [searchQuery, setSearchQuery] = useState("");
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
        console.log(imagesUrls);
    }, []);

    const filteredItems = itemsList.filter((item) =>
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full max-h-dvh scroll-auto overflow-auto h-auto">
            <div className="flex items-center justify-center mb-4 mt-4">
                <Link to="/">
                    <h1 className="font-mcFont text-6xl text-slate-100 textShadow">
                        Items list
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
                {filteredItems.map((item, index) => (
                    <ItemCard
                        key={index}
                        item={item}
                        image={imagesUrls[item.name]}
                        handleClick={() => console.log("Item click!")}
                    ></ItemCard>
                ))}
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
            className="flex flex-col w-48 h-48 items-center justify-center p-4 rounded-md border border-gray-300 shadow-lg
        bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-50 via-yellow-50 to-amber-200"
        >
            <img src={image} alt={item.name} />
            <h2 className="text-center">{item.displayName}</h2>
            <p>Stack: {item.stackSize}</p>
            {/*<button onClick={() => handleClick(item)}>Click me</button>*/}
        </div>
    );
}

export default ItemsPage;
