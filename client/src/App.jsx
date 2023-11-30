import { useState } from "react";
import Home from "./Home.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import taskTypes from "./assets/taskTypes.js";
import { sideNav, footerNav, connectNav } from "./assets/navElements.js"

const App = () => {

    const [selectedPage, setSelectedPage] = useState("home");

    const handleNavigationClick = (page) => {
        setSelectedPage(page);
    };

    return (
        <div id="main" className={selectedPage}>
            <Nav sideNav={sideNav} connectNav={connectNav} onNavigationClick={handleNavigationClick} />
            <Home taskTypes={taskTypes} onNavigationClick={handleNavigationClick}/>
            <Footer footerNav={footerNav} onNavigationClick={handleNavigationClick}/>
        </div>
    );
}

export default App;