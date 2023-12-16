import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import taskTypes from "./assets/taskTypes.js";
import { topNav, sideNav, bottomNav, connectNav } from "./assets/navElements.js"

const App = () => {

    const [selectedPageBg, setSelectedPageBg] = useState("home");
    const [currentPage, setCurrentPage] = useState("home");

    const [showAuthModal, setShowAuthModal] = useState({
        login: false,
        register: false
    });
    const [user, setUser] = useState({});

    const guestAuthNavElements = topNav.filter(item => item.name != "logout");
    const loggedAuthNavElements = topNav.filter(item => item.name === "logout");
    const [topNavElements, setTopNavElements] = useState(guestAuthNavElements);

    const guestSideNavElements = sideNav.filter(item => item.name != "profile");
    const [sideNavElements, setSideNavElements] = useState(guestSideNavElements);

    const handleNavigationClick = (page) => {
        !topNav.map(item => item.name).includes(page) && setSelectedPageBg(page);
        setCurrentPage(page);

        if (page === 'logout') {
            setUser({});
        }

        setShowAuthModal((oldShowAuthModalState) => {
            return Object.keys(oldShowAuthModalState)
                .reduce((newShowAuthModalState, key) => {
                    newShowAuthModalState[key] = key === page;
                    return newShowAuthModalState;
                }, {});
        });
    };

    const navigationUpdateHandler = () => {

        if (currentPage === 'logout') {
            window.history.pushState(null, null, `/home`);
            setCurrentPage('home');
        }

        if (user._id) {
            setTopNavElements(loggedAuthNavElements);
            setSideNavElements(sideNav);
        } else {
            setTopNavElements(guestAuthNavElements);
            setSideNavElements(guestSideNavElements);
        }
    }

    const hideAuthModalHandler = () => {
        setShowAuthModal({
            login: false,
            register: false
        });
    }

    useEffect(() => {
        navigationUpdateHandler();
    }, [user]);

    return (
        <main className={selectedPageBg}>
            <Nav selectedPageBg={selectedPageBg}
                topNav={topNavElements}
                sideNavElements={sideNavElements}
                connectNav={connectNav}
                bottomNav={bottomNav}
                showAuthModal={showAuthModal}
                user={user}
                hideAuthModal={hideAuthModalHandler}
                onNavigationClick={handleNavigationClick}
                setUser={setUser} />
            <Home taskTypes={taskTypes} onItemClick={handleNavigationClick} />
            <Footer />
        </main>
    );
}

export default App;