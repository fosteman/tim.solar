import {Box, Sheet, Typography} from "@mui/joy";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import useSwr from "swr";
import {Heartrate} from "../models";
import moment from "moment";
import Lottie from "lottie-react";
import heartBeatAnimation from '../assets/9427-heartbeat.json';
import _ from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default () => {
    const {data, error, isLoading} = useSwr<{
        data: Heartrate[]
    }>("/api/heartrate", fetcher);

    const heartBeatData = data?.data.map(datum => ({
        date: new Date(datum.timestamp).valueOf(),
        bpm: datum.bpm
    }));

    if (error)
        return <div>Failed to get my vitals. Maybe the avatar is down.</div>;
    if (isLoading) return <div>Loading my vitals...</div>;
    if (!data) return null;


    return <Sheet variant={'soft'} color={'neutral'} sx={{width: 'fit-content', p: 2}}>
        <Box sx={{display: 'flex', height: 80, alignItems:'center'}}>
        {/*<Typography level={'h2'} sx={{mr: 4}}>Heart rate</Typography>*/}

            <Box sx={{width: 96, mr: 4}}>
                <Lottie animationData={heartBeatAnimation} loop={true}/>
            </Box>

            <Typography level={'h1'} sx={{mr: 1}}>{_.last(heartBeatData).bpm}</Typography>

            <Box sx={{  alignItems:'center' }}>
            <Typography level={'body1'}>BPM</Typography>
            <Typography level={'body1'}>Fetched from my Oura ring {moment(_.last(heartBeatData).date).fromNow()}</Typography>
            </Box>
        </Box>


        <LineChart
            width={620}
            height={240}
            data={heartBeatData}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" scale="time"
                   type="number"
                   domain={[heartBeatData[0].date, heartBeatData[heartBeatData.length - 1].date]}
                   tickFormatter={(date) => moment(date).format('HH:mm')}/>
            <YAxis dataKey='bpm'/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="bpm" stroke="#8884d8"/>
        </LineChart>
    </Sheet>
}
