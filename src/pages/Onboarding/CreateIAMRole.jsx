import "./CreateIAMRole.scss";
import { useState } from "react";

const CreateIAMRole = ({ onValidation }) => {
  const [roleArn, setRoleArn] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setRoleArn(value);
    onValidation(value.trim().length > 0);
  };

  return (
    <div className="create-iam-role">
      <div className="create-iam-role__step">
        <div className="create-iam-role__step-number">1</div>
        <div className="create-iam-role__content">
          <p className="create-iam-role__text">
            Log into AWS account & <a href="#">Create an IAM Role</a>.
          </p>
        </div>
      </div>

      <div className="create-iam-role__step">
        <div className="create-iam-role__step-number">2</div>
        <div className="create-iam-role__content">
          <p className="create-iam-role__text">
            In the <i>Trusted entity type</i> section, select{" "}
            <span>Custom trust policy</span>.
          </p>

          <div className="create-iam-role__code">
            <button>
              {/* copy icon */}
            </button>
            <pre>{`{
  "Version": "2012-10-17",
  "Statement": [...]
}`}</pre>
          </div>
        </div>
      </div>

      <div className="create-iam-role__step">
        <div className="create-iam-role__step-number">6</div>
        <div className="create-iam-role__content">
          <p className="create-iam-role__text">
            Paste the copied Role ARN below -
          </p>

          <label className="create-iam-role__label">
            Enter the IAM Role ARN <span>*</span>
          </label>
          <input
            type="text"
            value={roleArn}
            onChange={handleChange}
            className="create-iam-role__input"
            placeholder="arn:aws:iam::275595855473:role/CK-Tuner-Role-dev2"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateIAMRole;
