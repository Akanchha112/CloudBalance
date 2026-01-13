import { useState } from "react";
import "./CustomerPolicies.scss";

const CustomerPolicies = () => {
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  const policies = [
    { id: 1, name: "cktuner-CostAuditPolicy", type: "Customer managed" },
    { id: 2, name: "cktuner-SecAuditPolicy", type: "Customer managed" },
    { id: 3, name: "cktuner-TunerReadEssentials", type: "Customer managed" }
  ];

  const togglePolicy = (id) => {
    setSelectedPolicies(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="customer-policies">
      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <p>
            Go to the <a href="#">CK-Tuner-Role</a>
          </p>

          <div className="card">
            <div className="breadcrumb">
              <span>IAM</span>
              <span>&gt;</span>
              <span className="link">Roles</span>
              <span>&gt;</span>
              <span>CloudKeeper</span>
            </div>

            <div className="header">
              <div>
                <h3>CK-Tuner-Role</h3>
                <span className="badge">Info</span>
              </div>
              <button className="btn-outline">Delete</button>
            </div>

            <div className="summary">
              <h4>Summary</h4>
              <div className="summary-grid">
                <div>
                  <p className="label">Creation date</p>
                  <p>August 30, 2024, 17:06 (UTC+05:30)</p>
                </div>
                <div>
                  <p className="label">ARN</p>
                  <p className="mono">
                    arn:aws:iam::123456789012:role/CK-Tuner-Role
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="step">
        <div className="step-number">2</div>
        <div className="step-content">
          <p>
            In Permission policies, click on <strong>Add permissions &gt; Attach Policy</strong>
          </p>

          <div className="card">
            <div className="tabs">
              <button className="active">Permissions</button>
              <button>Trust relationships</button>
              <button>Tags</button>
              <button>Last Accessed</button>
              <button>Revoke sessions</button>
            </div>

            <div className="card-body">
              <div className="toolbar">
                <div>
                  <h4>Permissions policies (6)</h4>
                  <p>You can attach up to 10 managed policies.</p>
                </div>

                <div className="actions">
                  <button className="icon-btn">⟳</button>
                  <button className="btn-outline">Simulate</button>
                  <button className="btn-outline">Remove</button>
                  <button className="btn-primary">Add permissions</button>
                </div>
              </div>

              <div className="filters">
                <input placeholder="Search" />
                <select>
                  <option>All types</option>
                </select>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Policy name</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policies.map(policy => (
                      <tr key={policy.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedPolicies.includes(policy.id)}
                            onChange={() => togglePolicy(policy.id)}
                          />
                        </td>
                        <td>
                          <a href="#">{policy.name}</a>
                        </td>
                        <td>{policy.type}</td>
                        <td>-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="footer-actions">
                <button className="btn-outline">Cancel</button>
                <button className="btn-warning">Add permissions</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="step">
        <div className="step-number">4</div>
        <div className="step-content">
          <p>
            Now, click on <strong>Add permissions</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPolicies;
