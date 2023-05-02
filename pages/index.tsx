import Head from "next/head";
import {CssVarsProvider} from "@mui/joy";
import Heartrate from "../components/Heartrate";

export default function Home() {

    return (
        <>
            <CssVarsProvider/>
            <Head>
                <title>Tim's HUD</title>
                <meta name="description" content="Tim's vitals"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Heartrate/>
            </main>
        </>
    );
}
