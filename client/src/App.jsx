import { useState } from "react";
import Home from "./Home.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import taskTypes from "./assets/taskTypes.js";
import { topNav, sideNav, bottomNav, connectNav } from "./assets/navElements.js"

const App = () => {

    const [selectedPageBg, setSelectedPageBg] = useState("home");
    const [showAuthModal, setShowAuthModal] = useState({
        login: false,
        register: false
    });

    const handleNavigationClick = (page) => {
        !topNav.map(item => item.name).includes(page) && setSelectedPageBg(page);

        setShowAuthModal((oldShowAuthModalState) => {
            return Object.keys(oldShowAuthModalState)
                .reduce((newShowAuthModalState, key) => {
                    newShowAuthModalState[key] = key === page;
                    return newShowAuthModalState;
                }, {});
        });
    };

    const hideAuthModalHandler = () => {
        setShowAuthModal({
            login: false,
            register: false
        });
    }

    return (
        <main className={selectedPageBg}>
            <Nav selectedPageBg={selectedPageBg}
                topNav={topNav}
                sideNav={sideNav}
                connectNav={connectNav}
                bottomNav={bottomNav}
                showAuthModal={showAuthModal}
                hideAuthModal={hideAuthModalHandler}
                onNavigationClick={handleNavigationClick} />
            <Home taskTypes={taskTypes} onItemClick={handleNavigationClick} />
            <Footer />
        </main>
    );
}

export default App;