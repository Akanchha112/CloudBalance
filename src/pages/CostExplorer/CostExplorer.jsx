import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCostData } from "../../utils/CostExplorerApiUtil";
import FiltersPanel from "./FiltersPanel";
import CostChart from "./CostChart";
import CostTable from "./CostTable";
import "./CostExplorer.scss";

const CostExplorer = () => {
  const selectedAccount = useSelector(state => state.account.selectedAccount);

  // Date range state
  const [startDate, setStartDate] = useState("2024-10-01");
  const [endDate, setEndDate] = useState("2025-03-31");
  
  // View controls
  const [viewType, setViewType] = useState("monthly");
  const [chartType, setChartType] = useState("msline");
  
  // Group by and filters
  const [groupBy, setGroupBy] = useState("SERVICE");
  const [appliedFilters, setAppliedFilters] = useState({});
  
  // Filter panel state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Data state
  const [loading, setLoading] = useState(false);
  const [costData, setCostData] = useState([]);

  // Fetch data when dependencies change
  useEffect(() => {
    if (!selectedAccount?.accountId) return;
    fetchCostData();
  }, [selectedAccount, groupBy, startDate, endDate, appliedFilters]);

  const fetchCostData = async () => {
    if (!selectedAccount?.accountId) return;

    const payload = {
      accountId: selectedAccount.accountId,
      startDate,
      endDate,
      groupBy,
      ...appliedFilters
    };

    try {
      setLoading(true);
      const res = await getCostData(payload);
      console.log("Fetched cost data:", res.data);
      setCostData(res.data || []);
    } catch (err) {
      console.error("Cost Explorer Error", err);
      setCostData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setAppliedFilters({});
  };

  if (!selectedAccount) {
    return (
      <div className="cost-explorer">
        <div className="empty-state">
          <h3>No Account Selected</h3>
          <p>Please select an account from the top bar to view cost data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cost-explorer">
      {/* Page Header */}
      <div className="page-header">
        <h1>Cost Explorer</h1>
        <p>How to always be aware of cost changes and history</p>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="controls-left">
          {/* Group By Selector */}
          <div className="control-group">
            <label>Group By:</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="group-by-select"
            >
              <option value="SERVICE">Service</option>
              <option value="INSTANCE_TYPE">Instance Type</option>
              <option value="USAGE_TYPE">Usage Type</option>
              <option value="PLATFORM">Platform</option>
              <option value="REGION">Region</option>
              <option value="USAGE_TYPE_GROUP">Usage Type Group</option>
            </select>
          </div>
        </div>

        <div className="controls-right">
          <button 
            className="filters-toggle-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span>🎯</span> Filters
          </button>
        </div>
      </div>

      {/* Date Range and Chart Controls */}
      <div className="chart-controls">
        <div className="date-range-picker">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate}
          />
          <span className="separator">—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        

        <div className="chart-type-toggle">
            <button
            className={chartType === "mscolumn2d" ? "active" : ""}
            onClick={() => setChartType("mscolumn2d")}
            title="Column Chart"
          >
            📊
          </button>
          <button
            className={chartType === "msline" ? "active" : ""}
            onClick={() => setChartType("msline")}
            title="Line Chart"
          >
            📈
          </button>
          
          <button
            className={chartType === "msarea" ? "active" : ""}
            onClick={() => setChartType("msarea")}
            title="Area Chart"
          >
            📉
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`main-content ${isFilterOpen ? 'filters-open' : ''}`}>
        {/* Chart Section */}
        <div className="chart-section">
          <CostChart 
            data={costData} 
            loading={loading} 
            chartType={chartType}
            groupBy={groupBy}
          />
        </div>

        {/* Filters Panel (Slide-in) */}
        {isFilterOpen && (
          <FiltersPanel
            accountId={selectedAccount.accountId}
            onApply={handleApplyFilters}
            onClose={() => setIsFilterOpen(false)}
            onReset={handleResetFilters}
            currentFilters={appliedFilters}
          />
        )}
      </div>

      {/* Table Section */}
      <div className="table-section">
        <CostTable 
          data={costData} 
          loading={loading}
          groupBy={groupBy}
        />
      </div>
    </div>
  );
};

export default CostExplorer;