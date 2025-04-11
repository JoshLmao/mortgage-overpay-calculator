export const calculateMortgageSchedule = (
    loanAmount: number,
    interestRate: number,
    monthlyPayment: number,
    paymentDay: number,
    overpayment: number,
    overpaymentDay: number,
    view: "Monthly" | "Daily" // New parameter to handle view toggle
) => {
    const schedule = [];
    let currentBalance = loanAmount;
    let currentDate = new Date();

    const dailyInterestRate = (interestRate / 100) / 365;

    // Monthly Breakdown
    if (view === "Monthly") {
        while (currentBalance > 0) {
            const startBalance = currentBalance;
            const monthlyInterest = (currentBalance * (interestRate / 100)) / 12;

            let payment = monthlyPayment;
            if (currentDate.getDate() === overpaymentDay) {
                payment += overpayment;
            }

            const totalPayment = Math.min(payment, startBalance + monthlyInterest);
            const endBalance = startBalance + monthlyInterest - totalPayment;

            schedule.push({
                date: currentDate.toISOString().split("T")[0],
                startBalance,
                interest: monthlyInterest,
                payment: totalPayment,
                endBalance,
            });

            currentBalance = endBalance;
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    }

    // Daily Breakdown
    else if (view === "Daily") {
        while (currentBalance > 0) {
            const startBalance = currentBalance;
            const interestEarned = currentBalance * dailyInterestRate;

            let payment = 0;
            if (currentDate.getDate() === paymentDay) {
                payment += monthlyPayment;
            }
            if (currentDate.getDate() === overpaymentDay) {
                payment += overpayment;
            }

            const totalPayment = Math.min(payment, startBalance + interestEarned);
            const endBalance = startBalance + interestEarned - totalPayment;

            schedule.push({
                date: currentDate.toISOString().split("T")[0],
                startBalance,
                interest: interestEarned,
                payment: totalPayment,
                endBalance,
            });

            currentBalance = endBalance;
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
    }

    return schedule;
};