import clsx from "clsx";
import React from "react";
import "./OnboardingButton.scss";

const OnboardingButton = ({ label, disabled = false, name, clickFunction }) => {
  return (
    <button
      type="button"
      name={name}
      disabled={disabled}
      onClick={clickFunction}
      className={clsx(
        "onboarding-button",
        disabled && "onboarding-button--disabled"
      )}
    >
      {label}
    </button>
  );
};

export default OnboardingButton;
