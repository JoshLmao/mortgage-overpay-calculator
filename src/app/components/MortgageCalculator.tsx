"use client";

import React, { useState } from "react";
import {
    Container,
    Stack,
    Select,
    NumberInput,
    Button,
    Table,
    ScrollArea,
    Title,
} from "@mantine/core";
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
        <Container>
            <Stack gap="lg">
                <Title order={2}>Mortgage Overpayment Calculator</Title>

                {/* Currency Selector */}
                <Select
                    label="Currency"
                    placeholder="Select a currency"
                    data={Object.keys(currencySymbols).map((key) => ({
                        value: key,
                        label: `${key} (${currencySymbols[key]})`,
                    }))}
                    value={currency}
                    onChange={(value) => setCurrency(value || "USD")}
                />

                {/* Loan Amount */}
                <NumberInput
                    label={`Loan Amount (${currencySymbol})`}
                    placeholder="Enter loan amount"
                    value={loanAmount}
                    onChange={(value) => setLoanAmount(Number(value) || 0)}
                    min={0}
                />

                {/* Annual Interest Rate */}
                <NumberInput
                    label="Annual Interest Rate (%)"
                    placeholder="Enter interest rate"
                    value={interestRate}
                    onChange={(value) => setInterestRate(Number(value) || 0)}
                    min={0}
                    step={0.1}
                />

                {/* Monthly Payment */}
                <NumberInput
                    label={`Regular Monthly Payment (${currencySymbol})`}
                    placeholder="Enter monthly payment"
                    value={monthlyPayment}
                    onChange={(value) => setMonthlyPayment(Number(value) || 0)}
                    min={0}
                />

                {/* Payment Day */}
                <NumberInput
                    label="Payment Day of Month"
                    placeholder="Enter payment day"
                    value={paymentDay}
                    onChange={(value) => setPaymentDay(Number(value) || 1)}
                    min={1}
                    max={28}
                />

                {/* Overpayment Amount */}
                <NumberInput
                    label={`Overpayment Amount (${currencySymbol})`}
                    placeholder="Enter overpayment amount"
                    value={overpayment}
                    onChange={(value) => setOverpayment(Number(value) || 0)}
                    min={0}
                />

                {/* Overpayment Day */}
                <NumberInput
                    label="Overpayment Day of Month"
                    placeholder="Enter overpayment day"
                    value={overpaymentDay}
                    onChange={(value) => setOverpaymentDay(Number(value) || 1)}
                    min={1}
                    max={28}
                />

                {/* View Toggle */}
                <Select
                    label="View Options"
                    placeholder="Select view"
                    data={[
                        { value: "Monthly", label: "Monthly Breakdown" },
                        { value: "Daily", label: "Daily Breakdown" },
                    ]}
                    value={view}
                    onChange={(value) =>
                        setView((value as "Monthly" | "Daily") || "Monthly")
                    }
                />

                {/* Calculate Button */}
                <Button fullWidth onClick={handleCalculate}>
                    Calculate Schedule
                </Button>
            </Stack>

            {/* Payment Schedule Table */}
            {schedule.length > 0 && (
                <Stack gap="md" mt="lg">
                    <Title order={3}>{view} Payment Schedule</Title>
                    <ScrollArea style={{ maxHeight: "100vh" }}>
                        <Table
                            striped
                            highlightOnHover
                            withTableBorder
                            withColumnBorders
                        >
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th>Date</th>
                                    <th>Start Balance ({currencySymbol})</th>
                                    <th>Interest Earned ({currencySymbol})</th>
                                    <th>Payment ({currencySymbol})</th>
                                    <th>End Balance ({currencySymbol})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.date}</td>
                                        <td>{row.startBalance.toFixed(2)}</td>
                                        <td>{row.interest.toFixed(2)}</td>
                                        <td>{row.payment.toFixed(2)}</td>
                                        <td>{row.endBalance.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ScrollArea>
                </Stack>
            )}
        </Container>
    );
};

export default MortgageCalculator;
