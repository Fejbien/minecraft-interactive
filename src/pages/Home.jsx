import subPages from "../data/subPages.json";
import { Link } from "react-router-dom";

function Home() {
    const subPagesDiv = subPages.map((subPage) => {
        return (
            <Link
                key={subPage.link}
                to={subPage.link}
                className="text-3xl text-center font-mcFont text-slate-100 font-normal not-italic drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:text-blue-500"
            >
                {subPage.name}
            </Link>
        );
    });

    return (
        <div className=" font-mcFont text-slate-100 font-normal text-4xl not-italic textShadow flex flex-col w-full items-center justify-center">
            Home
            <div className="grid grid-cols-1 gap-4 mt-4">{subPagesDiv}</div>
        </div>
    );
}

export default Home;
