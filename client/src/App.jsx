import { useState } from "react";
import Home from "./Home.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import taskTypes from "./assets/taskTypes.js";
import { topNav, sideNav, bottomNav, connectNav } from "./assets/navElements.js"

const App = () => {

    const [selectedPage, setSelectedPage] = useState("home");

    const handleNavigationClick = (page) => {
        setSelectedPage(page);
    };

    return (
        <main className={selectedPage}>
            <Nav topNav={topNav} sideNav={sideNav} connectNav={connectNav} bottomNav={bottomNav} selectedPage={selectedPage} onNavigationClick={handleNavigationClick} />
            <Home taskTypes={taskTypes} onItemClick={handleNavigationClick} />
            <Footer />
        </main>
    );
}

export default App;