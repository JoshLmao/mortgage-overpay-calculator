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
    const currentDate = new Date();
    const dailyInterestRate = interestRate / 365;

    while (currentBalance > 0) {
        const startBalance = currentBalance;
        const monthlyInterest = (currentBalance * (interestRate / 100)) / 12;
        const dayInterest = currentBalance * dailyInterestRate;

        let payment = monthlyPayment;
        if (currentDate.getDate() === overpaymentDay) {
            payment += overpayment;
        }

        const totalPayment = Math.min(payment, startBalance + monthlyInterest);
        const endBalance = startBalance + monthlyInterest - totalPayment;

        schedule.push({
            date: currentDate.toISOString().split('T')[0],
            startBalance,
            interest: dayInterest,
            payment: totalPayment,
            endBalance,
        });

        currentBalance = endBalance;
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return schedule;
};