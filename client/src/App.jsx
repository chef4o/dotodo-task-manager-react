import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import AboutUs from "./components/AboutUs.jsx";
import News from "./components/news/News.jsx";
import Events from "./components/events/Events.jsx";
import Checklists from "./components/checklists/Checklists.jsx";
import Notes from "./components/notes/Notes.jsx";
import Nav from "./components/Nav.jsx";
import Spinner from "./components/Spinner.jsx";
import NotFound from "./components/error/NotFound.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/auth/LoginModal.jsx";
import RegisterModal from "./components/auth/RegisterModal.jsx";
import NewArticleItem from "./components/news/NewArticleItem.jsx";
import ArticleDetails from "./components/news/ArticleDetails.jsx";
import Contacts from "./components/Contacts.jsx";
import Profile from "./components/profile/Profile.jsx";
import AdminPanel from "./components/admin-panel/AdminPanel.jsx";
import taskTypes from "./assets/taskTypes.js";
import { topNav, sideNav, bottomNav, connectNav } from "./assets/navElements.js";
import { handleLogout } from "./services/authService.js";
import NavContext from "./contexts/navContext.js";
import AuthContext from "./contexts/authContext.js";
import UnderConstruction from "./components/error/UnderConstruction.jsx";
import { Path } from "./assets/paths.js";

const App = () => {
  const [selectedPageBg, setSelectedPageBg] = useState("home");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState({
    login: false,
    register: false,
  });
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("User is empty or doesn't have email");
    }
  }, [user]);

  const guestAuthNavElements = topNav.filter((item) => item.name == "login" || item.name == "register");
  const loggedAuthNavElements = topNav.filter(({ name }) => !guestAuthNavElements.some((el) => el.name === name));
  const [topNavElements, setTopNavElements] = useState(guestAuthNavElements);

  const guestSideNavElements = sideNav.filter((item) => item.name != "profile");
  const [sideNavElements, setSideNavElements] = useState(guestSideNavElements);

  const handleNavigationClick = (page) => {
    !topNav.map((item) => item.name).includes(page) && setSelectedPageBg(page);

    if (page === "logout") {
      setUser({});
      handleLogout();
    }

    setShowAuthModal((oldShowAuthModalState) => {
      return Object.keys(oldShowAuthModalState).reduce((newShowAuthModalState, key) => {
        newShowAuthModalState[key] = key === page;
        return newShowAuthModalState;
      }, {});
    });
  };

  const hideAuthModalHandler = () => {
    setShowAuthModal({
      login: false,
      register: false,
    });
  };

  useEffect(() => {
    if (user.email) {
      setTopNavElements(loggedAuthNavElements);
      setSideNavElements(sideNav);
    } else {
      setTopNavElements(guestAuthNavElements);
      setSideNavElements(guestSideNavElements);
    }
  }, [user]);

  return (
    <NavContext.Provider value={{ handleNavigationClick, selectedPageBg, setLoading, navigate }}>
      <AuthContext.Provider value={{ user, setUser, hideAuthModal: hideAuthModalHandler }}>
        <main className={selectedPageBg}>
          <Nav
            topNav={topNavElements}
            sideNavElements={sideNavElements}
            connectNav={connectNav}
            bottomNav={bottomNav}
          />

          {loading && <Spinner />}

          {(showAuthModal.login || showAuthModal.register) && (
            <div className="backdrop" onClick={hideAuthModalHandler} />
          )}
          {showAuthModal.login && <LoginModal />}
          {showAuthModal.register && <RegisterModal />}

          <Routes>
            <Route path={Path.HOME} element={<Home taskTypes={taskTypes} />} />
            <Route path={Path.NOTES} element={<Notes />} />
            <Route path={Path.NOTE} element={<Notes />} />
            <Route path={Path.CHECKLISTS} element={<Checklists />} />
            <Route path={Path.CHECKLIST} element={<Checklists />} />
            <Route path={Path.EVENTS} element={<Events />} />
            <Route path={Path.PROFILE} element={<Profile />} />
            <Route path={Path.PROFILE_EDIT} element={<Profile />} />
            <Route path={Path.ABOUT} element={<AboutUs />} />
            <Route path={Path.CONTACTS} element={<Contacts />} />
            <Route path={Path.NEWS} element={<News />} />
            <Route path={Path.NEW_ARTICLE} element={<NewArticleItem />} />
            <Route path={Path.ARTICLE} element={<ArticleDetails />} />
            <Route path={Path.ADMIN_PANEL} element={<AdminPanel />} />
            <Route path={Path.UNDER_CONSTRUCTION} element={<UnderConstruction />} />
            <Route path={Path.ANY} element={<NotFound />} />
          </Routes>

          <Footer />
        </main>
      </AuthContext.Provider>
    </NavContext.Provider>
  );
};

export default App;
