import React from "react";
import img1 from "../../../assets/onbording/addcust1.png";
import img2 from "../../../assets/onbording/addcust2.png";
import img3 from "../../../assets/onbording/addcust3.png";
import IndexPointer from "./IndexPointer";
import "./PolicyManagement.scss";

const PolicyManagement = () => {
  return (
    <div className="policy-management">
      {/* Step 1 */}
      <div className="policy-management__step">
        <div className="policy-management__content">
          <IndexPointer num={1} />
          <p className="policy-management__text">
            Go to the{" "}
            <a className="policy-management__link">
              CK-Tuner-Role
            </a>.
          </p>
        </div>

        <div className="policy-management__image">
          <img src={img1} alt="Add Custom Managed Policies" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="policy-management__step">
        <div className="policy-management__content">
          <IndexPointer num={2} />
          <p className="policy-management__text">
            In Permission policies, click on Add permissions &gt; Attach Policy
          </p>
        </div>

        <div className="policy-management__image">
          <img src={img2} alt="Attach Policy" />
        </div>
      </div>

      {/* Step 3 */}
      <div className="policy-management__step">
        <div className="policy-management__content">
          <IndexPointer num={3} />
          <p className="policy-management__text">
            Filter by Type &gt; Customer managed, then search and select
            cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, and
            cktuner-TunerReadEssentials.
          </p>
        </div>

        <div className="policy-management__image">
          <img src={img3} alt="Select Policies" />
        </div>
      </div>

      {/* Step 4 */}
      <div className="policy-management__final-step">
        <IndexPointer num={4} />
        <p className="policy-management__text">
          Now, click on Add permissions.
        </p>
      </div>
    </div>
  );
};

export default PolicyManagement;
