import React from "react";

export const Alert = ({ type, message }) => {
  if (!message) return null; 

  const className =
    type === "error" ? "alert alert-danger" : "alert alert-success";

  return <div className={className}>{message}</div>;
};
