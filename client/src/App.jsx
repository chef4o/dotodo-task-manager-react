import { useState } from "react";
import Home from "./Home.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import taskTypes from "./assets/taskTypes.js";
import { topNav, sideNav, bottomNav, connectNav } from "./assets/navElements.js"

const App = () => {

    const [selectedPage, setSelectedPage] = useState("home");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleNavigationClick = (page) => {
        !topNav.map(item => item.name).includes(page) && setSelectedPage(page);

        if (page === 'login') {
            setShowLoginModal(true);
            setShowRegisterModal(false);
        } else if (page === 'register') {
            setShowRegisterModal(true);
            setShowLoginModal(false);
        }
    };

    const hideAuthModalHandler = (auth) => {
        if (auth === 'login') {
            setShowLoginModal(false);
        } else if (auth === 'register') {
            setShowRegisterModal(false);
        } else {
            setShowLoginModal(false);
            setShowRegisterModal(false);
        }
    }

    return (
        <main className={selectedPage}>
            <Nav topNav={topNav} sideNav={sideNav} connectNav={connectNav} bottomNav={bottomNav}
                showLoginModal={showLoginModal} showRegisterModal={showRegisterModal} selectedPage={selectedPage}
                onNavigationClick={handleNavigationClick} hideAuthModal={hideAuthModalHandler} />
            <Home taskTypes={taskTypes} onItemClick={handleNavigationClick} />
            <Footer />
        </main>
    );
}

export default App;