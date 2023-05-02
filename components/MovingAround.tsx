import {Box, Divider, Sheet, Typography} from "@mui/joy";
import useSwr from "swr";
import {Activity} from "../models";
import Lottie from "lottie-react";
import animation from '../assets/125597-running.json';
import _ from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default () => {
    const {data, error, isLoading} = useSwr<{ data: Activity[] }>("/api/activity", fetcher);

    const lastActivity: Activity | null = _.last(data?.data);

    if (error)
        return <div>Failed to get my vitals. Maybe the avatar is down.</div>;
    if (isLoading) return <div>Loading my vitals...</div>;
    if (!data) return null;

    return <Sheet variant={'soft'} color={'neutral'} sx={{width: 'fit-content', p: 2}}>
        <Box sx={{display: 'flex', height: 120, alignItems: 'center'}}>
            {/*<Typography level={'h2'} sx={{mr: 4}}>Heart rate</Typography>*/}

            <Box sx={{width: 96, mr: 4}}>
                <Lottie animationData={animation} loop={true}/>
            </Box>

            <Typography level={'h2'} sx={{mr: 1}}>{lastActivity?.equivalent_walking_distance / 1000}</Typography>

            <Box sx={{alignItems: 'center'}}>
                <Typography level={'body1'}>Kilometers</Typography>
                <Typography level={'body2'}>Dancing Equivalent</Typography>
            </Box>
        </Box>
    </Sheet>
}
