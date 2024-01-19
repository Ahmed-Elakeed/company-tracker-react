import "./PageNotFound.css";
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    const backPage = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    return (
        <div className="mainContainer">
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" alt=""/>
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" alt=""/>
            <p className="title">Oh no!!</p>
            <br/>
            <p className="subtitle">
                You’re either misspelling the URL <br/><br/> or requesting a page that's no longer here.
            </p>
            <div align="center">
                <a href="/back" className="btn btn-primary" onClick={backPage}>Back to previous page</a>
            </div>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" alt=""/>
            <img alt="" src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship"/>

        </div>
    );
}
export default PageNotFound;