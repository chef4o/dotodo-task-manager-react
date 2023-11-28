import PropTypes from "prop-types";

const taskTypePropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export { taskTypePropType };