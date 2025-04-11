import Head from "next/head";
import MortgageCalculator from "./components/MortgageCalculator";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Mortgage Overpayment Calculator</title>
                <meta
                    name="description"
                    content="Visualize the effects of overpaying your mortgage"
                />
            </Head>
            <main className="min-h-screen flex items-center justify-center bg-gray-100">
                <MortgageCalculator />
            </main>
        </div>
    );
}
