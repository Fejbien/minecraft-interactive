import PropTypes from "prop-types";
import itemsList from "../data/items.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";
import { Litematic } from "@kleppe/litematic-reader";

LitematicaResourcesPage.propTypes = {
    imagesUrls: PropTypes.object.isRequired,
};

function LitematicaResourcesPage({ imagesUrls }) {
    const [file, setFile] = useState(null);
    const [resourcesList, setResourcesList] = useState({});

    const mapper = {
        redstone_wire: "redstone",
        lava_cauldron: "cauldron",
        lava: "lava_bucket",
        water: "water_bucket",
        stone_brick: "stone_bricks",
        carrots: "carrot",
    };

    const ignoreList = ["air", "bubble_column", "piston_head"];

    useEffect(() => {
        const loadResources = async () => {
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result;
                let litematic = new Litematic(arrayBuffer);
                const blocks = await litematic.getAllBlocks();
                const resources = blocks.map((block) => ({
                    name: block.block,
                }));

                const itemCounts = {};
                resources.forEach((resource) => {
                    resource.name = resource.name.replace("minecraft:", "");
                    resource.name = resource.name.replace(/\[.*?\]/, "");
                    resource.name = resource.name.replace("_wall", "");
                    resource.name = resource.name.replace("wall_", "");

                    if (ignoreList.includes(resource.name)) return;
                    if (mapper[resource.name])
                        resource.name = mapper[resource.name];

                    if (itemCounts[resource.name]) itemCounts[resource.name]++;
                    else itemCounts[resource.name] = 1;
                });

                const sortedResources = Object.entries(itemCounts).sort(
                    (a, b) => b[1] - a[1]
                );
                setResourcesList(Object.fromEntries(sortedResources));
            };
            reader.readAsArrayBuffer(file);
        };

        loadResources();
    }, [file]);

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const resourcesListHtml = Object.keys(resourcesList).map(
        (resource, index) => {
            const item = itemsList.find((item) => item.name === resource);

            return (
                <div
                    key={index}
                    className="w-3/5 flex flex-row justify-evenly items-center bg-slate-100 bg-opacity-80 p-2 rounded-md m-2"
                >
                    <img
                        src={imagesUrls[resource]}
                        alt={resource}
                        className="w-12 h-12"
                    ></img>
                    <p className="text-3xl font-mcFont">
                        {item?.displayName || resource}
                    </p>
                    <p className="text-xl">Count: {resourcesList[resource]}</p>
                    {resourcesList[resource] >= 64 && (
                        <p className="text-xl">
                            {"  "}
                            Which is:{"  "}
                            {Math.floor(item?.stackSize || 64)}
                            {" Stacks and "}
                            {resourcesList[resource] % item?.stackSize}
                        </p>
                    )}
                </div>
            );
        }
    );

    return (
        <div className="flex flex-col w-full max-h-dvh scroll-auto overflow-auto h-auto">
            <div className="flex items-center justify-center mb-4 mt-4">
                <Link to="/">
                    <h1 className="font-mcFont text-6xl text-slate-100 textShadow">
                        Litematica resources list
                    </h1>
                </Link>
            </div>
            <HorizontalEndRodBar />
            <div className="w-full flex justify-center mt-4 mb-4">
                <input
                    type="file"
                    accept=".litematic"
                    multiple={false}
                    onChange={handleFileUpload}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                />
            </div>
            <div className="w-full">
                <div className="flex flex-col justify-center items-center">
                    {resourcesList && resourcesListHtml}
                </div>
            </div>
        </div>
    );
}

export default LitematicaResourcesPage;
