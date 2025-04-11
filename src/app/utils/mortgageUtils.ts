export const calculateMortgageSchedule = (
    loanAmount: number,
    interestRate: number,
    monthlyPayment: number,
    paymentDay: number,
    overpayment: number,
    overpaymentDay: number
) => {
    const schedule = [];
    let currentBalance = loanAmount;
    let currentDate = new Date();

    while (currentBalance > 0) {
        const startBalance = currentBalance;

        // Calculate daily interest
        const dailyInterestRate = (interestRate / 100) / 365;
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const interestEarned = startBalance * dailyInterestRate * daysInMonth;

        let payment = monthlyPayment;
        if (currentDate.getDate() === overpaymentDay) {
            payment += overpayment;
        }

        const totalPayment = Math.min(payment, startBalance + interestEarned);
        const endBalance = startBalance + interestEarned - totalPayment;

        schedule.push({
            date: currentDate.toISOString().split('T')[0],
            startBalance,
            interest: interestEarned,
            payment: totalPayment,
            endBalance,
        });

        currentBalance = endBalance;
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return schedule;
};