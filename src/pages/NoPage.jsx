import { Link } from "react-router-dom";

function NoPage() {
    return (
        <div>
            <p>No Page</p>
            <Link to="/">back</Link>
        </div>
    );
}

export default NoPage;
