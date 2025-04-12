import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import Head from "next/head";
import MortgageCalculator from "./components/MortgageCalculator";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    /** Put your mantine theme override here */
});

export default function Home() {
    return (
        <MantineProvider theme={theme}>
            <div>
                <Head>
                    <title>Mortgage Overpayment Calculator</title>
                    <meta
                        name="description"
                        content="Visualize the effects of overpaying your mortgage"
                    />
                    <ColorSchemeScript />
                </Head>
                <main className="min-h-screen flex items-center justify-center bg-gray-100">
                    <MortgageCalculator />
                </main>
            </div>
        </MantineProvider>
    );
}
