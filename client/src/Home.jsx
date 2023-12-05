import PropTypes from "prop-types";
import TaskType from "./components/TaskType";
import { taskTypePropType } from "./util/propTypes";

export default function Home({ taskTypes, onItemClick }) {

  return (
    <div className="content-home">
      <div className="intro">
        <h3>
          Welcome to your very own<span> DOTODO Persoanl assistant </span>! 
            Our aim is to keep you<span> up-to-date </span>
          with your ongoing tasks and keep all your activities
          <span> on track</span>.
        </h3>
        <p>
          Our user-friendly task management platform empowers you to create,
          prioritize, and track tasks effortlessly, ensuring you never forget
          a thing or miss a deadline again. To unlock the full potential of our
          task management platform and enjoy personalized features, we invite you
          to<a className="register" href="register"> create an account </a>or
          simply<a className="login" href="login"> log in </a>if you&apos;re
          already a registered member.
        </p>
      </div>

      <div className="featured-img" />

      <ul className="options">
        {taskTypes
          .map(type => <TaskType key={type.name} name={type.name} headerText={type.headerText} onItemClick={onItemClick} />)}
      </ul>
    </div>
  );
}

Home.propTypes = {
  taskTypes: PropTypes.arrayOf(taskTypePropType).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
