import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Home from "./components/home/Home.jsx";
import AboutUs from "./components/AboutUs.jsx";
import News from "./components/News.jsx";
import Events from "./components/events/Events.jsx";
import Checklists from "./components/checklists/Checklists.jsx";
import Notes from "./components/notes/Notes.jsx";
import Nav from "./components/Nav.jsx";
import NotFound from "./components/error/NotFound.jsx";
import Footer from "./components/Footer.jsx";
import taskTypes from "./assets/taskTypes.js";
import { topNav, sideNav, bottomNav, connectNav } from "./assets/navElements.js"
import Contacts from "./components/Contacts.jsx";
import Profile from "./components/profile/Profile.jsx";

const testUser = {
    _id: '07f260f4-466c-4607-9a33-f7273b24f1b4',
    username: 'test',
    firstName: "Stefan"
}

const App = () => {

    const [selectedPageBg, setSelectedPageBg] = useState("home");

    const [showAuthModal, setShowAuthModal] = useState({
        login: false,
        register: false
    });
    const [user, setUser] = useState(testUser); //to replace with {}

    const guestAuthNavElements = topNav.filter(item => item.name != "logout");
    const loggedAuthNavElements = topNav.filter(item => item.name === "logout");
    const [topNavElements, setTopNavElements] = useState(guestAuthNavElements);

    const guestSideNavElements = sideNav.filter(item => item.name != "profile");
    const [sideNavElements, setSideNavElements] = useState(guestSideNavElements);

    const handleNavigationClick = (page) => {
        !topNav.map(item => item.name).includes(page) && setSelectedPageBg(page);

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

    const hideAuthModalHandler = () => {
        setShowAuthModal({
            login: false,
            register: false
        });
    }

    useEffect(() => {
        if (user._id) {
            setTopNavElements(loggedAuthNavElements);
            setSideNavElements(sideNav);
        } else {
            setTopNavElements(guestAuthNavElements);
            setSideNavElements(guestSideNavElements);
        }
    }, [user]);

    return (
        <main className={selectedPageBg}>
            <Nav selectedPageBg={selectedPageBg}
                topNav={topNavElements}
                sideNavElements={sideNavElements}
                connectNav={connectNav}
                bottomNav={bottomNav}
                user={user}
                setUser={setUser}
                showAuthModal={showAuthModal}
                hideAuthModal={hideAuthModalHandler}
                onNavigationClick={handleNavigationClick} />

            <Routes>
                <Route path='/' element={<Home taskTypes={taskTypes} onItemClick={handleNavigationClick} />} />
                <Route path='/notes' element={<Notes user={user} onItemClick={handleNavigationClick} />} />
                <Route path='/checklists' element={<Checklists user={user} onItemClick={handleNavigationClick} />} />
                <Route path='/events' element={<Events user={user} onItemClick={handleNavigationClick} />} />
                <Route path='/profile/:id' element={<Profile user={user} onItemClick={handleNavigationClick} />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/news' element={<News />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <Footer />
        </main>
    );
}

export default App;