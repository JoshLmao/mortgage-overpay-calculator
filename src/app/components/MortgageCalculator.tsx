"use client";

import React, { useState } from "react";
import { calculateMortgageSchedule } from "../utils/mortgageUtils";

interface ScheduleEntry {
    date: string;
    startBalance: number;
    interest: number;
    payment: number;
    endBalance: number;
}

const currencySymbols: { [key: string]: string } = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    JPY: "¥",
    AUD: "A$",
};

const MortgageCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(300000); // Example default
    const [interestRate, setInterestRate] = useState(3.5); // Annual interest rate
    const [monthlyPayment, setMonthlyPayment] = useState(1500);
    const [paymentDay, setPaymentDay] = useState(1);
    const [overpayment, setOverpayment] = useState(200);
    const [overpaymentDay, setOverpaymentDay] = useState(15);
    const [currency, setCurrency] = useState("USD");
    const [view, setView] = useState<"Monthly" | "Daily">("Monthly"); // Toggle between views
    const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

    const handleCalculate = () => {
        const result = calculateMortgageSchedule(
            loanAmount,
            interestRate,
            monthlyPayment,
            paymentDay,
            overpayment,
            overpaymentDay,
            view // Pass the selected view to the calculation logic
        );
        setSchedule(result);
    };

    const currencySymbol = currencySymbols[currency];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-black">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Mortgage Overpayment Calculator
            </h1>
            <div className="space-y-4">
                {/* Currency Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Currency
                    </label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {Object.keys(currencySymbols).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loan Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Loan Amount ({currencySymbol})
                    </label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Annual Interest Rate */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
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

                {/* Monthly Payment */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Regular Monthly Payment ({currencySymbol})
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

                {/* Payment Day */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
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

                {/* Overpayment Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Overpayment Amount ({currencySymbol})
                    </label>
                    <input
                        type="number"
                        value={overpayment}
                        onChange={(e) => setOverpayment(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Overpayment Day */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
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

                {/* View Toggle */}
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        View Options
                    </label>
                    <select
                        value={view}
                        onChange={(e) =>
                            setView(e.target.value as "Monthly" | "Daily")
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="Monthly">Monthly Breakdown</option>
                        <option value="Daily">Daily Breakdown</option>
                    </select>
                </div>

                {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Calculate Schedule
                </button>
            </div>

            {/* Payment Schedule Table */}
            {schedule.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">
                        {view} Payment Schedule
                    </h2>
                    <div
                        className="overflow-y-auto max-h-screen border border-gray-300 rounded-md"
                        style={{ maxHeight: "75vh" }}
                    >
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Date
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Start Balance ({currencySymbol})
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Interest Earned ({currencySymbol})
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Payment ({currencySymbol})
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        End Balance ({currencySymbol})
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
                </div>
            )}
        </div>
    );
};

export default MortgageCalculator;
