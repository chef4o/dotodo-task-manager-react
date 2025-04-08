import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Path } from "./assets/paths.js";
import NavContext, { NavProvider } from "./contexts/navContext.jsx";
import AuthContext, { AuthProvider } from "./contexts/authContext.jsx";
import taskTypes from "./assets/taskTypes.js";
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
import UnderConstruction from "./components/error/UnderConstruction.jsx";

const AppContent = () => {
  const { loading } = useContext(NavContext);
  const { showAuthModal, hideAuthModal } = useContext(AuthContext);

  return (
    <main>
      <Nav />
      {loading && <Spinner />}
      {(showAuthModal.login || showAuthModal.register) && <div className="backdrop" onClick={hideAuthModal} />}
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
  );
};

const App = () => {
  return (
    <NavProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavProvider>
  );
};

export default App;
