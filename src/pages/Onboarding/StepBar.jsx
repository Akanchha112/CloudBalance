import "./StepBar.scss";

const StepBar = ({ steps, currentStep }) => {
  return (
    <div className="step-bar">
      {steps.map((step, index) => {
        const completed = index < currentStep;
        const active = index === currentStep;

        return (
          <div key={index} className="step-bar__item">
            <div className="step-bar__content">
              <div
                className={`step-bar__circle ${
                  completed
                    ? "step-bar__circle--completed"
                    : active
                    ? "step-bar__circle--active"
                    : "step-bar__circle--inactive"
                }`}
              >
                {completed ? "✓" : String.fromCharCode(65 + index)}
              </div>

              <span
                className={`step-bar__label ${
                  active
                    ? "step-bar__label--active"
                    : "step-bar__label--inactive"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="step-bar__separator">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path
                    d="M2 2L8 8L2 14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepBar;
