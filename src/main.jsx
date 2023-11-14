import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import taskTypes from "./assets/taskTypes.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Nav />
    <Home taskTypes={taskTypes}/>
    <Footer />
  </>
);
