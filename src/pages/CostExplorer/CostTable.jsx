import { useMemo } from "react";
import "./CostTable.scss";

const CostTable = ({ data, loading, groupBy }) => {
  const tableData = useMemo(() => {
    if (!data || data.length === 0) return null;

    console.log("Processing table data:", data);

    // Group data by groupBy value and month
    const rowsMap = {};
    const monthsSet = new Set();

    data.forEach(row => {
      const monthDate = row.MONTH || row.month;
      if (!monthDate) return;

      const month = new Date(monthDate).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });

      const groupValue = row[groupBy] || row.SERVICE || row.service || 'Total';
      const cost = parseFloat(row.TOTAL_COST || row.cost || 0);

      monthsSet.add(month);

      if (!rowsMap[groupValue]) {
        rowsMap[groupValue] = { name: groupValue, months: {}, total: 0 };
      }
      rowsMap[groupValue].months[month] = (rowsMap[groupValue].months[month] || 0) + cost;
      rowsMap[groupValue].total += cost;
    });

    const months = Array.from(monthsSet).sort((a, b) => new Date(a) - new Date(b));
    const rows = Object.values(rowsMap).sort((a, b) => b.total - a.total);

    console.log("Processed table - Months:", months, "Rows:", rows.length);

    return { months, rows };
  }, [data, groupBy]);

  if (loading) {
    return (
      <div className="cost-table-wrapper loading">
        <div className="spinner"></div>
        <p>Loading table data...</p>
      </div>
    );
  }

  if (!tableData || tableData.rows.length === 0) {
    return (
      <div className="cost-table-wrapper empty">
        <div className="empty-icon">📋</div>
        <h3>No Data Available</h3>
        <p>Try adjusting your filters or date range to see cost data</p>
      </div>
    );
  }

  const { months, rows } = tableData;

  // Calculate column totals
  const columnTotals = months.map(month => 
    rows.reduce((sum, row) => sum + (row.months[month] || 0), 0)
  );
  const grandTotal = columnTotals.reduce((sum, val) => sum + val, 0);

  return (
    <div className="cost-table-wrapper">
      <div className="cost-table-info">
        <p>💡 We are showing up top {Math.min(rows.length, 1000)} records by cost.</p>
      </div>
      <div className="cost-table-container">
        <table className="cost-table">
          <thead>
            <tr>
              <th className="sticky-col">{groupBy || 'Service'}</th>
              {months.map(month => (
                <th key={month}>{month}</th>
              ))}
              <th className="total-col">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 1000).map((row, idx) => (
              <tr key={idx}>
                <td className="sticky-col">{row.name}</td>
                {months.map(month => (
                  <td key={month}>
                    ${(row.months[month] || 0).toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </td>
                ))}
                <td className="total-col">
                  ${row.total.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td className="sticky-col"><strong>Total</strong></td>
              {columnTotals.map((total, idx) => (
                <td key={idx}>
                  <strong>${total.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}</strong>
                </td>
              ))}
              <td className="total-col">
                <strong>${grandTotal.toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CostTable;