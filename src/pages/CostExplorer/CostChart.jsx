import { useMemo } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import powercharts from "fusioncharts/fusioncharts.powercharts";

import "./CostChart.scss";

charts(FusionCharts);
powercharts(FusionCharts);

const CostChart = ({ data, loading, chartType = "mscolumn2d", groupBy }) => {
    const chartConfig = useMemo(() => {
        if (!data || data.length === 0) {
            return null;
        }

        // console.log("Processing chart data:", data);

        // Group data by month and groupBy value
        const monthsMap = {};
        const groupValuesSet = new Set();

        data.forEach(row => {
            const monthDate = row.MONTH || row.month;
            if (!monthDate) return;

            const month = new Date(monthDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            });

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

        // console.log("Processed months:", months);
        // console.log("Processed group values:", groupValues);

        // Build categories
        const categories = [{
            category: months.map(m => ({ label: m }))
        }];

        // Build dataset
        const dataset = groupValues.map(groupValue => ({
            seriesname: groupValue,
            renderAs: chartType === "msstackedcolumn2d" ? "column" : undefined,
            data: months.map(month => ({
                value: monthsMap[month][groupValue] || 0
            }))
        }));

        // Colors matching the first image
        const chartColors = "#5B8FF9,#61CDBB,#F6BD16,#7262FD,#78D3F8,#9661BC,#F6903D,#008685";

        return {
            type: chartType,
            width: "100%",
            height: "400",
            dataFormat: "json",
            dataSource: {
                chart: {
                    stack100Percent: "0",
                    showSum: "1",
                    // Remove caption and subcaption for cleaner look
                    caption: "",
                    subCaption: "",
                    xAxisName: "Months",
                    yAxisName: "Cost ($)",

                    // Theme and styling
                    theme: "fusion",
                    bgColor: "#FFFFFF",
                    canvasBgColor: "#FFFFFF",

                    // Number formatting
                    numberPrefix: "$",
                    formatNumberScale: "1",
                    decimals: "2",

                    // Chart behavior
                    showValues: "0",
                    rotateValues: "0",
                    placeValuesInside: "0",

                    // Legend
                    legendPosition: "bottom",
                    legendIconScale: "1",
                    legendScrollBgColor: "#FFFFFF",
                    showLegend: groupValues.length > 1 ? "1" : "0",

                    // Axes
                    divLineColor: "#E8E8E8",
                    divLineAlpha: "50",
                    divLineThickness: "1",
                    divLineDashed: "0",

                    // Grid
                    showAlternateHGridColor: "0",
                    showAlternateVGridColor: "0",

                    // Anchors (for line charts)
                    anchorRadius: "4",
                    anchorBgColor: "#FFFFFF",
                    anchorBorderThickness: "2",

                    // Hover effect
                    plotToolText: "<b>$seriesName</b><br>$label: <b>$dataValue</b>",

                    // Colors - matching first image
                    paletteColors: chartColors,

                    // Canvas
                    canvasBorderAlpha: "0",
                    canvasPadding: "20",

                    // Font
                    baseFont: "Arial, Helvetica, sans-serif",
                    baseFontSize: "12",
                    baseFontColor: "#262626",

                    // Animation
                    animation: "1",
                    animationDuration: "0.7",

                    // Crossline
                    drawCrossLine: "1",
                    crossLineColor: "#5B8FF9",
                    crossLineAlpha: "50"
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
                <div className="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect x="8" y="24" width="8" height="32" fill="#E8E8E8" />
                        <rect x="20" y="16" width="8" height="40" fill="#E8E8E8" />
                        <rect x="32" y="28" width="8" height="28" fill="#E8E8E8" />
                        <rect x="44" y="20" width="8" height="36" fill="#E8E8E8" />
                    </svg>
                </div>
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
