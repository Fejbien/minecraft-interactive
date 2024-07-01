import enchantmentsList from "../data/enchantments.json";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HorizontalEndRodBar } from "../components/HorizontalEndRodBar";

LitematicaResourcesPage.propTypes = {
    imagesUrls: PropTypes.object.isRequired,
};

function LitematicaResourcesPage({ imagesUrls }) {
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
    };

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
            <input
                type="file"
                accept=".litematic"
                multiple={false}
                onChange={handleFileUpload}
            />
        </div>
    );
}

export default LitematicaResourcesPage;
