import React from "react";
import { Link } from "react-router";
import { ReactComponent as AddIcon } from "../assets/add.svg";

const AddButton = () => {
  return (
    <Link to="/note/new" className="floating-button">
      <AddIcon />
    </Link>
  );
};

export default AddButton;
