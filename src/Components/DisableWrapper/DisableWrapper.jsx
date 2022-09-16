import React from "react";

import './DisableWrapper.css';

const DisableWrapper = ({ children, disabled }) => {
  if (!disabled) return <>{children}</>;

  return <div className="disabledWrapper">{children}</div>;
};

export default DisableWrapper;
