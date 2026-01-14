import React from "react";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import img1 from "../../../assets/onbording/cur1.png";
import img2 from "../../../assets/onbording/cur2.png";
import img3 from "../../../assets/onbording/cur3.png";
import IndexPointer from "./IndexPointer";
import { toast } from "react-toastify";
import "./CUR.scss";

const resourceID = `ck-tuner-275595855473-hourly-cur`;
const rolePath = `275595855473`;

const CUR = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied");
  };

  return (
    <div className="cur">
      <div className="cur__step">
        <IndexPointer num={1} />
        <p>
          Go to{" "}
          <a className="cur__link">
            Cost and Usage Reports
          </a>{" "}
          in the Billing Dashboard and click on Create report.
        </p>
      </div>

      <div className="cur__step">
        <IndexPointer num={2} />
        <p>
          Name the report as shown below and select the{" "}
          <b>Include resource IDs</b> checkbox -
        </p>
      </div>

      <div
        className="cur__code"
        onClick={() => copyToClipboard(resourceID)}
      >
        <button className="cur__copy-btn">
          <ContentCopyTwoToneIcon />
        </button>
        <pre>{resourceID}</pre>
      </div>

      <p>Ensure that the following configuration is checked</p>

      <div className="cur__check">
        <input type="checkbox" defaultChecked />
        <b>Include resource IDs</b>
      </div>

      <p>
        Click on <b>Next</b>
      </p>

      <div className="cur__image">
        <img src={img1} alt="Create Cost & Usage Report" />
      </div>

      <div className="cur__step">
        <IndexPointer num={3} />
        <p>
          In <i>Configure S3 Bucket</i>, provide the name of the S3 bucket that
          was created -
        </p>
      </div>

      <p>Ensure that the following configuration is checked</p>

      <div className="cur__check">
        <input type="checkbox" defaultChecked />
        <b>The following default policy will be applied to your bucket</b>
      </div>

      <p>
        Click on <b>Save</b>
      </p>

      <div className="cur__image">
        <img src={img2} alt="Configure S3 Bucket" />
      </div>

      <div className="cur__step">
        <IndexPointer num={4} />
        <p>
          In the <i>Delivery options</i> section, enter the below-mentioned
          Report path prefix -
        </p>
      </div>

      <p>Report path prefix:</p>

      <div
        className="cur__input-copy"
        onClick={() => copyToClipboard(rolePath)}
      >
        <input value={rolePath} readOnly />
        <button className="cur__copy-btn">
          <ContentCopyTwoToneIcon />
        </button>
      </div>

      <p>Additionally, ensure that the following checks are in place</p>
      <p>Time granularity:</p>

      <div className="cur__radio">
        <input type="radio" checked readOnly />
        <b>Hourly</b>
      </div>

      <p>
        Please make sure these checks are enabled in Enable report data
        integration for:
      </p>

      <div className="cur__check">
        <input type="checkbox" defaultChecked />
        <b>Amazon Athena</b>
      </div>

      <div className="cur__image">
        <img src={img3} alt="Enable Athena" />
      </div>

      <div className="cur__step">
        <IndexPointer num={5} />
        <p>
          Click on <b>Next</b>. Review the configuration and click on{" "}
          <b>Create Report</b>.
        </p>
      </div>
    </div>
  );
};

export default CUR;
