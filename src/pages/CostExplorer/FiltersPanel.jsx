import { useEffect, useState } from "react";
import { getFilterValues } from "../../utils/CostExplorerApiUtil";
import "./FiltersPanel.scss";

const FILTER_CONFIG = [
  { key: 'services', label: 'Service', type: 'SERVICE' },
  { key: 'instanceTypes', label: 'Instance Type', type: 'INSTANCE_TYPE' },
  { key: 'usageTypes', label: 'Usage Type', type: 'USAGE_TYPE' },
  { key: 'platforms', label: 'Platform', type: 'PLATFORM' },
  { key: 'regions', label: 'Region', type: 'REGION' },
  { key: 'usageTypeGroups', label: 'Usage Type Group', type: 'USAGE_TYPE_GROUP' },
];

const FiltersPanel = ({ accountId, onApply, onClose, onReset, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters || {});
  const [expandedFilters, setExpandedFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [loading, setLoading] = useState({});

  const toggleFilter = async (filterKey, filterType) => {
    const isExpanding = !expandedFilters[filterKey];
    
    setExpandedFilters(prev => ({
      ...prev,
      [filterKey]: isExpanding
    }));

    // Fetch options when expanding
    if (isExpanding && !filterOptions[filterKey]) {
      setLoading(prev => ({ ...prev, [filterKey]: true }));
      try {
        const res = await getFilterValues(filterType, accountId);
        setFilterOptions(prev => ({
          ...prev,
          [filterKey]: res.data || []
        }));
      } catch (err) {
        console.error(`Failed to fetch ${filterKey}:`, err);
        setFilterOptions(prev => ({
          ...prev,
          [filterKey]: []
        }));
      } finally {
        setLoading(prev => ({ ...prev, [filterKey]: false }));
      }
    }
  };

  const handleCheckboxChange = (filterKey, value) => {
    setFilters(prev => {
      const currentValues = prev[filterKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterKey]: newValues.length > 0 ? newValues : undefined
      };
    });
  };

  const handleSelectAll = (filterKey) => {
    const options = getFilteredOptions(filterKey);
    const currentValues = filters[filterKey] || [];
    
    if (currentValues.length === options.length) {
      // Deselect all
      setFilters(prev => ({
        ...prev,
        [filterKey]: undefined
      }));
    } else {
      // Select all
      setFilters(prev => ({
        ...prev,
        [filterKey]: options
      }));
    }
  };

  const getFilteredOptions = (filterKey) => {
    const options = filterOptions[filterKey] || [];
    const searchTerm = searchTerms[filterKey] || '';
    
    if (!searchTerm) return options;
    
    return options.filter(opt =>
      opt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleApply = () => {
    // Remove undefined/empty filters
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.length > 0) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onApply(cleanedFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  const getTotalSelectedCount = () => {
    return Object.values(filters).reduce((sum, arr) => 
      sum + (arr?.length || 0), 0
    );
  };

  return (
    <div className="filters-panel">
      <div className="filters-header">
        <h3>Filters</h3>
        {getTotalSelectedCount() > 0 && (
          <span className="selected-badge">{getTotalSelectedCount()} selected</span>
        )}
      </div>

      <div className="filters-body">
        {FILTER_CONFIG.map(({ key, label, type }) => (
          <div key={key} className="filter-group">
            <div 
              className="filter-header"
              onClick={() => toggleFilter(key, type)}
            >
              <span className="filter-label">{label}</span>
              <div className="filter-header-right">
                {filters[key]?.length > 0 && (
                  <span className="filter-count">({filters[key].length})</span>
                )}
                <span className={`arrow ${expandedFilters[key] ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
            </div>

            {expandedFilters[key] && (
              <div className="filter-content">
                <div className="filter-search">
                  <input
                    type="text"
                    placeholder={`Search ${label}...`}
                    value={searchTerms[key] || ''}
                    onChange={(e) => setSearchTerms(prev => ({
                      ...prev,
                      [key]: e.target.value
                    }))}
                  />
                </div>

                {loading[key] ? (
                  <div className="filter-loading">Loading...</div>
                ) : (
                  <>
                    <div className="select-all-option">
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            filters[key]?.length === getFilteredOptions(key).length &&
                            getFilteredOptions(key).length > 0
                          }
                          onChange={() => handleSelectAll(key)}
                        />
                        <span>Select All</span>
                      </label>
                    </div>

                    <div className="filter-options">
                      {getFilteredOptions(key).length > 0 ? (
                        getFilteredOptions(key).map(option => (
                          <label key={option} className="filter-option">
                            <input
                              type="checkbox"
                              checked={filters[key]?.includes(option) || false}
                              onChange={() => handleCheckboxChange(key, option)}
                            />
                            <span className="option-text">{option}</span>
                          </label>
                        ))
                      ) : (
                        <div className="no-options">
                          {filterOptions[key]?.length === 0 
                            ? 'No options available' 
                            : 'No results found'}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="filters-footer">
        <button className="btn-reset" onClick={handleReset}>
          Reset All
        </button>
        <button className="btn-close" onClick={onClose}>
          Close
        </button>
        <button className="btn-apply" onClick={handleApply}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;