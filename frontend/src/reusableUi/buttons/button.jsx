import React from "react";
import "./button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
