import { useState } from "react";
import CreateIAMRole from "./CreateIAMRole";
import CustomerPolicies from "./CustomerPolicies";
import CreateCUR from "./CreateCUR";
import StepBar from "./StepBar";
import BoardLayout from "./BoardLayout";
import "./Onboarding.scss";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      heading: "Create an IAM Role",
      subheading: "Create an IAM Role by following these steps",
      component: <CreateIAMRole />,
    },
    {
      heading: "Add Customer Managed Policies",
      subheading: "Create an inline policy for the role",
      component: <CustomerPolicies />,
    },
    {
      heading: "Create Cost & Usage Report",
      subheading: "Create a Cost & Usage Report",
      component: <CreateCUR />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (<>
    <StepBar steps={steps} currentStep={currentStep} />
    <BoardLayout
      heading={steps[currentStep].heading}
      subheading={steps[currentStep].subheading}
      footer={
        <>
          <button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </button>
          <button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      }
    >
      
      {steps[currentStep].component}
    </BoardLayout>
    </>
  );
};

export default Onboarding;

