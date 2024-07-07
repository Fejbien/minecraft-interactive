import itemsList from "../data/items.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";
import { Litematic } from "@kleppe/litematic-reader";

import PropTypes from "prop-types";

function LitematicaResourcesPage() {
    const [file, setFile] = useState(null);
    const [resourcesList, setResourcesList] = useState({});

    // Sadly this mapper is required because the litematic reader uses different names for some blocks
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
                <ItemTile
                    key={index}
                    item={item}
                    resource={resource}
                    resourcesList={resourcesList}
                />
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

ItemTile.propTypes = {
    item: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    resourcesList: PropTypes.object.isRequired,
};
function ItemTile({ item, resource, resourcesList }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            className="m-2 text-slate-900 bg-gray-100 w-3/5 flex flex-col items-center justify-evenly p-4 rounded-md border border-gray-300 shadow-lg 
            hover:bg-gray-200 cursor-pointer"
            onClick={handleExpand}
            style={{
                transition:
                    "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
                overflow: "hidden",
                maxHeight: expanded ? "500px" : "150px",
            }}
        >
            <div className="flex flex-row justify-evenly items-center w-full">
                <div className="w-1/12 flex justify-center">
                    <div
                        style={{
                            backgroundImage: `url(/itemIcons/${item.name}.png)`,
                        }}
                        className="w-12 h-12"
                    ></div>
                </div>
                <div className="w-2/6 flex justify-center">
                    <p className="text-3xl font-mcFont text-center">
                        {item?.displayName || resource}
                    </p>
                </div>
                <p className="text-xl text-center">
                    Count: {resourcesList[resource]}
                </p>
            </div>
            {expanded && (
                <div
                    className={`flex flex-col mt-4 w-full p-6 transition-all duration-300 ease-in-out ${
                        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                >
                    <p className="text-center">
                        Here will be information about stack sizes requierd and
                        some extras i guess
                    </p>
                </div>
            )}
        </div>
    );
}

export default LitematicaResourcesPage;
