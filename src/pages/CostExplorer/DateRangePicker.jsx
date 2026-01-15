import { useState } from "react";
import "./DateRangePicker.scss";

const DateRangePicker = ({ startDate, endDate, onApply, onClose }) => {
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

  const handleApply = () => {
    onApply(tempStart, tempEnd);
    onClose();
  };

  return (
    <div className="date-picker-modal">
      <div className="date-picker-overlay" onClick={onClose} />
      <div className="date-picker-content">
        <div className="date-picker-header">
          <h3>Select Date Range</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="date-picker-body">
          <div className="date-input-group">
            <label>Start Date</label>
            <input
              type="date"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              max={tempEnd}
            />
          </div>

          <div className="date-separator">to</div>

          <div className="date-input-group">
            <label>End Date</label>
            <input
              type="date"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
              min={tempStart}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="date-picker-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-apply" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
