import Head from "next/head";
import {Grid} from "@mui/material";
import Heartrate from "../components/Heartrate";
import Activity from "../components/Bioreactor";
import {CssVarsProvider} from "@mui/joy";
import Bioreactor from "../components/MovingAround";

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
                <Grid container spacing={2}>
                    <Grid item><Heartrate/></Grid>
                    <Grid item><Activity/></Grid>
                    <Grid item><Bioreactor/></Grid>
                </Grid>
            </main>
        </>
    );
}
