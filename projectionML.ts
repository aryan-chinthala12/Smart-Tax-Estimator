export interface DataPoint {
    month: number; // 1-12
    amount: number;
}

/**
 * Simulates a simple linear regression to project year-end totals
 * based on year-to-date data points.
 */
export function projectYearEnd(dataPoints: DataPoint[]): number {
    if (dataPoints.length === 0) return 0;
    if (dataPoints.length === 1) return dataPoints[0].amount * 12;

    // Simple Linear Regression: y = mx + b
    const n = dataPoints.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (const pt of dataPoints) {
        sumX += pt.month;
        sumY += pt.amount;
        sumXY += pt.month * pt.amount;
        sumX2 += pt.month * pt.month;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Project sum for months 1 to 12
    let projectedTotal = 0;
    for (let m = 1; m <= 12; m++) {
        // If we have actual data, use it, otherwise project
        const actual = dataPoints.find(p => p.month === m);
        if (actual) {
            projectedTotal += actual.amount;
        } else {
            projectedTotal += Math.max(0, slope * m + intercept);
        }
    }

    return projectedTotal;
}
