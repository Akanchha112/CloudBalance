import React from "react";
import IndexPointer from "./IndexPointer.jsx";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { Data } from "./CustomerTrustPolicy.js";
import img from "../../../assets/onbording/createiam.png";
import Input from "../../../components/Input/Input.jsx";
import { toast } from "react-toastify";

import "./IamRoleCreation.scss";

const IamRoleCreation = ({ account, setAccount }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  return (
    <div className="iam-role" id="accountCreation">
      <div className="iam-role__container">
        <h1 className="iam-role__title">Create an IAM Role</h1>
        <h3 className="iam-role__subtitle">
          Create an IAM Role by following these steps
        </h3>

        <div className="iam-role__card">
          {/* Step 1 */}
          <div className="iam-role__step">
            <IndexPointer num={1} />
            <p>Log into AWS account &amp; create an IAM Role.</p>
          </div>

          {/* Step 2 */}
          <div className="iam-role__block">
            <div className="iam-role__step">
              <IndexPointer num={2} />
              <p>
                In the Trusted entity type section, select Custom trust policy.
                Replace the prefilled policy with the policy provided below:
              </p>
            </div>

            <pre className="iam-role__policy">
              {Data}
              <button
                className="iam-role__copy-btn"
                onClick={() => copyToClipboard(Data)}
              >
                <ContentCopyTwoToneIcon />
              </button>
            </pre>

            {/* Step 3 */}
            <div className="iam-role__step">
              <IndexPointer num={3} />
              <p>
                Click <b>Next</b> to go to the <i>Add permissions</i> page.
                Skip permissions and click <b>Next</b>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="iam-role__step">
              <IndexPointer num={4} />
              <p>
                Enter the following role name and click <b>Create role</b>.
              </p>
            </div>

            <div className="iam-role__readonly">
              <input
                value="CK-Tuner-Role-dev2"
                readOnly
              />
              <button
                onClick={() => copyToClipboard("CK-Tuner-Role-dev2")}
              >
                <ContentCopyTwoToneIcon />
              </button>
            </div>

            {/* Step 5 */}
            <div className="iam-role__step">
              <IndexPointer num={5} />
              <p>
                Go to the newly created role and copy the <b>Role ARN</b>.
              </p>
            </div>

            <div className="iam-role__image">
              <img src={img} alt="IAM Role ARN Screenshot" />
            </div>

            {/* Step 6 */}
            <div className="iam-role__step iam-role__step--highlight">
              <IndexPointer num={6} />
              <b>Paste the copied Role ARN below</b>
            </div>

            <div className="iam-role__inputs">
              <Input
                label="IAM Role ARN"
                name="arn"
                value={account.arn}
                onChange={handleChange}
                placeholder="Paste ARN"
                required
                // error={!account.arn && "IAM Role ARN is required"}
              />

              <Input
                label="Account ID"
                type="Number"
                name="id"
                value={account.id}
                onChange={handleChange}
                placeholder="Enter Account ID"
                required
                // error={!account.id && "Account ID is required"}
              />
            </div>

            <Input
              label="Account Name"
              name="name"
              value={account.name}
              onChange={handleChange}
              placeholder="Enter Account Name"
              required
              // error={!account.name && "Account Name is required"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IamRoleCreation;
