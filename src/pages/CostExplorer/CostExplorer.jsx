
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCostData } from "../../utils/CostExplorerApiUtil";
import FiltersPanel from "./FiltersPanel";
import CostChart from "./CostChart";
import CostTable from "./CostTable";
import DateRangePicker from "./DateRangePicker";
import "./CostExplorer.scss";

const CostExplorer = () => {
  const selectedAccount = useSelector(state => state.account.selectedAccount);

  // Date range state
  const [startDate, setStartDate] = useState("2024-10-01");
  const [endDate, setEndDate] = useState("2025-03-31");
  const [showDatePicker, setShowDatePicker] = useState(false);
  
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

    console.log("Fetching cost data with payload:", payload);

    try {
      setLoading(true);
      const res = await getCostData(payload);
      console.log("Fetched cost data:", res.data);
      setCostData(res.data || []);
    } catch (error) {
      toast.error("Cost Explorer Error"+ (error?.response?.data?.message || error.message));
      setCostData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setAppliedFilters({});
  };

  const handleDateApply = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const formatDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - ${end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  };

  if (!selectedAccount) {
    return (
      <div className="cost-explorer">
        <div className="empty-state">
          <span className="empty-icon">📊</span>
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
        <div>
          <h1>Cost Explorer</h1>
          <p>How to always be aware of cost changes and history</p>
        </div>
      </div>

      {/* Controls Bar - Matching First Image */}
      <div className="controls-bar">
        {/* Group By Pills */}
        <div className="group-by-pills">
          <label>Group By:</label>
          <button 
            className={groupBy === "SERVICE" ? "pill active" : "pill"}
            onClick={() => setGroupBy("SERVICE")}
          >
            Service
          </button>
          <button 
            className={groupBy === "INSTANCE_TYPE" ? "pill active" : "pill"}
            onClick={() => setGroupBy("INSTANCE_TYPE")}
          >
            Instance Type
          </button>
         
          <button 
            className={groupBy === "USAGE_TYPE" ? "pill active" : "pill"}
            onClick={() => setGroupBy("USAGE_TYPE")}
          >
            Usage Type
          </button>
          <button 
            className={groupBy === "PLATFORM" ? "pill active" : "pill"}
            onClick={() => setGroupBy("PLATFORM")}
          >
            Platform
          </button>
          <button 
            className={groupBy === "REGION" ? "pill active" : "pill"}
            onClick={() => setGroupBy("REGION")}
          >
            Region
          </button>
          <button 
            className={groupBy === "USAGE_TYPE_GROUP" ? "pill active" : "pill"}
            onClick={() => setGroupBy("USAGE_TYPE_GROUP")}
          >
            Usage Type Group
          </button>
        </div>

        {/* Filters Toggle Button */}
        <button 
          className={`filters-toggle-btn ${isFilterOpen ? 'active' : ''}`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 2h16v2H0V2zm3 5h10v2H3V7zm3 5h4v2H6v-2z"/>
          </svg>
          Filters
        </button>
      </div>

      {/* Costs Label & Date/Chart Controls - Matching First Image */}
      <div className="secondary-controls">
        <div className="costs-label">
          Costs ({costData.length})
        </div>

        <div className="date-chart-controls">
          {/* Date Range Display with Calendar Button */}
          <div className="date-range-display">
            <input 
              type="text" 
              value={formatDateRange()}
              readOnly
            />
            <button 
              className="calendar-btn"
              onClick={() => setShowDatePicker(true)}
            >
              📅
            </button>
          </div>

          

          {/* Chart Type Icons */}
          <div className="chart-icons">
            <button
              className={chartType === "msline" ? "active" : ""}
              onClick={() => setChartType("msline")}
              title="Line Chart"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12 L5 8 L8 10 L12 4 L14 6"/>
              </svg>
            </button>
            <button
              className={chartType === "mscolumn2d" ? "active" : ""}
              onClick={() => setChartType("mscolumn2d")}
              title="Bar Chart"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="8" width="3" height="6"/>
                <rect x="6" y="4" width="3" height="10"/>
                <rect x="10" y="6" width="3" height="8"/>
              </svg>
            </button>
            <button
              className={chartType === "stackedcolumn2d" ? "active" : ""}
              onClick={() => setChartType("stackedcolumn2d")}
              title="Stacked Bar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="10" width="3" height="4"/>
                <rect x="2" y="6" width="3" height="4"/>
                <rect x="6" y="8" width="3" height="6"/>
                <rect x="6" y="4" width="3" height="4"/>
                <rect x="10" y="10" width="3" height="4"/>
                <rect x="10" y="6" width="3" height="4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      <div className={`main-content ${isFilterOpen ? 'filters-open' : ''}`}>
        
        <div className="chart-section">
          <CostChart 
            data={costData} 
            loading={loading} 
            chartType={chartType}
            groupBy={groupBy}
          />
        </div>

       
        {isFilterOpen && (
          <div className="filters-overlay" onClick={() => setIsFilterOpen(false)} />
        )}
        
        
        <div className={`filters-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <FiltersPanel
            accountId={selectedAccount.accountId}
            onApply={handleApplyFilters}
            onClose={() => setIsFilterOpen(false)}
            onReset={handleResetFilters}
            currentFilters={appliedFilters}
          />
        </div>
      </div>

      
      <div className="table-section">
        <CostTable 
          data={costData} 
          loading={loading}
          groupBy={groupBy}
        />
      </div>

      
      {showDatePicker && (
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onApply={handleDateApply}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default CostExplorer;