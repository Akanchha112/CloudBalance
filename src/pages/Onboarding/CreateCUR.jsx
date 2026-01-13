import "./CreateCUR.scss";

const CreateCUR = () => {
  return (
    <div className="create-cur">
      <div className="create-cur__step">
        <div className="create-cur__step-number">1</div>
        <div className="create-cur__content">
          <p className="create-cur__text">
            Go to <a href="#">Cost and Usage Reports</a> in the Billing Dashboard
            and click on <span>Create report</span>.
          </p>
        </div>
      </div>

      <div className="create-cur__step">
        <div className="create-cur__step-number">2</div>
        <div className="create-cur__content">
          <p className="create-cur__text">
            Name the report and select <span>Include resource IDs</span>.
          </p>

          <div className="create-cur__card">
            <div className="create-cur__card-inner">
              <label className="create-cur__label">
                Report name – required
              </label>
              <input
                className="create-cur__input"
                readOnly
                value="ck-tuner-{accountId}-hourly-cur"
              />
              <p className="create-cur__hint">
                Report name must be unique and contain only supported characters.
              </p>
            </div>

            <div className="create-cur__card-inner">
              <h4 className="create-cur__title">Report content</h4>
              <div className="create-cur__option">
                <input type="checkbox" checked readOnly />
                <div>
                  <p>Include Resource IDs</p>
                  <p>
                    Including individual resource IDs can increase file size.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="create-cur__text">Click on <span>Next</span></p>
        </div>
      </div>

      <div className="create-cur__step">
        <div className="create-cur__step-number">3</div>
        <div className="create-cur__content">
          <p className="create-cur__text">
            In <i>Configure S3 Bucket</i>, provide the bucket name.
          </p>

          <div className="create-cur__card">
            <h3 className="create-cur__title">Set delivery options</h3>
            <input
              className="create-cur__input"
              readOnly
              value="ck-tuner-27*******"
            />
          </div>
        </div>
      </div>

      <div className="create-cur__step">
        <div className="create-cur__step-number">4</div>
        <div className="create-cur__content">
          <div className="create-cur__card">
            <h4 className="create-cur__title">Report versioning</h4>

            <div className="create-cur__option">
              <input type="radio" name="versioning" />
              <div>
                <p>Create new report version</p>
                <p>Improves audibility over time.</p>
              </div>
            </div>

            <div className="create-cur__option">
              <input type="radio" name="versioning" defaultChecked />
              <div>
                <p>Overwrite existing report</p>
                <p>Saves on S3 storage costs.</p>
              </div>
            </div>

            <div className="create-cur__divider">
              <h4 className="create-cur__title">Report data integration</h4>
              <div className="create-cur__highlight">
                <input type="checkbox" checked readOnly />
                <span>Amazon Athena</span>
              </div>
            </div>

            <div className="create-cur__divider">
              <h4 className="create-cur__title">Compression type</h4>
              <select className="create-cur__select">
                <option>Parquet</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="create-cur__step">
        <div className="create-cur__step-number">5</div>
        <div className="create-cur__content">
          <p className="create-cur__text">
            Review the configuration and click <span>Create Report</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateCUR;
