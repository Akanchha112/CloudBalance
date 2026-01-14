import { useMemo } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import "./CostChart.scss";

charts(FusionCharts);

const CostChart = ({ data, loading, chartType = "msline", groupBy }) => {
  const chartConfig = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }

    console.log("Processing chart data:", data);

    // Group data by month and groupBy value
    const monthsMap = {};
    const groupValuesSet = new Set();

    data.forEach(row => {
      // Handle different date formats
      const monthDate = row.MONTH || row.month;
      if (!monthDate) return;

      const month = new Date(monthDate).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });

      // Get the group value based on groupBy
      const groupValue = row[groupBy] || row.SERVICE || row.service || 'Total';
      const cost = parseFloat(row.TOTAL_COST || row.cost || 0);

      groupValuesSet.add(groupValue);

      if (!monthsMap[month]) {
        monthsMap[month] = {};
      }
      monthsMap[month][groupValue] = (monthsMap[month][groupValue] || 0) + cost;
    });

    const months = Object.keys(monthsMap).sort((a, b) => 
      new Date(a) - new Date(b)
    );
    const groupValues = Array.from(groupValuesSet);

    console.log("Processed months:", months);
    console.log("Processed group values:", groupValues);

    // Build categories
    const categories = [{
      category: months.map(m => ({ label: m }))
    }];

    // Build dataset
    const dataset = groupValues.map(groupValue => ({
      seriesname: groupValue,
      data: months.map(month => ({
        value: monthsMap[month][groupValue] || 0
      }))
    }));

    return {
      type: chartType,
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Cost Analysis",
          subCaption: `Grouped by ${groupBy}`,
          xAxisName: "Months",
          yAxisName: "Cost ($)",
          theme: "fusion",
          showValues: "0",
          numberPrefix: "$",
          formatNumberScale: "1",
          decimals: "2",
          anchorRadius: "4",
          divLineAlpha: "20",
          paletteColors: "#4F81BC,#C0504E,#9BBB58,#23BFAA,#F79647,#8064A1,#4AACC5,#F15C80",
          plotToolText: "<b>$seriesName</b><br>$label: <b>$dataValue</b>",
          legendPosition: "bottom",
          drawCrossLine: "1",
          showLegend: groupValues.length > 1 ? "1" : "0"
        },
        categories,
        dataset
      }
    };
  }, [data, chartType, groupBy]);

  if (loading) {
    return (
      <div className="cost-chart loading">
        <div className="spinner"></div>
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (!chartConfig) {
    return (
      <div className="cost-chart empty">
        <div className="empty-icon">📊</div>
        <h3>No Data Available</h3>
        <p>Try adjusting your filters or date range to see cost data</p>
      </div>
    );
  }

  return (
    <div className="cost-chart">
      <ReactFusioncharts {...chartConfig} />
    </div>
  );
};

export default CostChart;