"use client";

import React, { useState } from "react";
import { calculateMortgageSchedule } from "../utils/mortgageUtils";

interface MortgageCalculatorProps {}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = () => {
    const [loanAmount, setLoanAmount] = useState(300000); // Example default
    const [interestRate, setInterestRate] = useState(3.5); // Annual interest rate
    const [monthlyPayment, setMonthlyPayment] = useState(1500);
    const [paymentDay, setPaymentDay] = useState(1);
    const [overpayment, setOverpayment] = useState(200);
    const [overpaymentDay, setOverpaymentDay] = useState(15);

    const [schedule, setSchedule] = useState<
        {
            date: string;
            startBalance: number;
            interest: number;
            payment: number;
            endBalance: number;
        }[]
    >([]);

    const handleCalculate = () => {
        const result = calculateMortgageSchedule(
            loanAmount,
            interestRate,
            monthlyPayment,
            paymentDay,
            overpayment,
            overpaymentDay
        );
        setSchedule(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-black">
                Mortgage Overpayment Calculator
            </h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Loan Amount
                    </label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Annual Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) =>
                            setInterestRate(Number(e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Regular Monthly Payment
                    </label>
                    <input
                        type="number"
                        value={monthlyPayment}
                        onChange={(e) =>
                            setMonthlyPayment(Number(e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Payment Day of Month
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="28"
                        value={paymentDay}
                        onChange={(e) => setPaymentDay(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Overpayment Amount
                    </label>
                    <input
                        type="number"
                        value={overpayment}
                        onChange={(e) => setOverpayment(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Overpayment Day of Month
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="28"
                        value={overpaymentDay}
                        onChange={(e) =>
                            setOverpaymentDay(Number(e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <button
                    onClick={handleCalculate}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Calculate Schedule
                </button>
            </div>

            {schedule.length > 0 && (
                <div className="mt-6 text-black">
                    <h2 className="text-xl font-bold">Payment Schedule</h2>
                    <table className="min-w-full mt-2 border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                    Date
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Start Balance
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Interest
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Payment
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    End Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((row, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.date}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.startBalance.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.interest.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.payment.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.endBalance.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MortgageCalculator;
