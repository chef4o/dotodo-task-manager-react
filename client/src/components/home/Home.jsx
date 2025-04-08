import { Link } from "react-router-dom";
import { useContext } from "react";
import TaskType from "./TaskType";
import AuthContext from "../../contexts/authContext.jsx";

export default function Home({ taskTypes }) {
  const { setShowAuthModal } = useContext(AuthContext);

  return (
    <div className="content home">
      <div className="intro">
        <h3>
          Welcome to your very own<span> DOTODO Personal assistant </span>! Our aim is to keep you
          <span> up-to-date </span>
          with your ongoing tasks and keep all your activities
          <span> on track</span>.
        </h3>
        <p>
          Our user-friendly task management platform empowers you to create, prioritize, and track tasks effortlessly,
          ensuring you never forget a thing or miss a deadline again. To unlock the full potential of our platform and
          enjoy personalized features, we invite you to
          <Link className="register" onClick={() => setShowAuthModal({ login: false, register: true })}>
            {` create an account `}
          </Link>
          or simply
          <Link className="login" onClick={() => setShowAuthModal({ login: true, register: false })}>
            {` log in `}
          </Link>
          if you&apos;re already a registered member.
        </p>
      </div>

      <div className="featured-img" />

      <ul className="options">
        {taskTypes.map((type) => (
          <TaskType key={type.name} name={type.name} headerText={type.headerText} />
        ))}
      </ul>
    </div>
  );
}
