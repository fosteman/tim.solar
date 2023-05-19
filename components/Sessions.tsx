import {Box, Sheet} from "@mui/joy";
import useSwr from "swr";
import {Activity, Workout} from "../models";
import Lottie from "lottie-react";
import animation from '../assets/28973-nuclear-sign.json';
import _ from "lodash";
import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import moment from "moment";
import {LocalFireDepartment, LocalFireDepartmentOutlined, Timer, TimerOutlined} from "@mui/icons-material";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default () => {
    const {data, error, isLoading} = useSwr<Workout[]>("/api/sessions", fetcher);

    if (error)
        return <div>Failed to get my vitals. Maybe the avatar is down.</div>;
    if (isLoading) return <div>Loading my vitals...</div>;
    if (!data) return null;

    console.log(data)

    return <Sheet variant={'soft'} color={'neutral'} sx={{width: 'fit-content', p: 2}}>
        <List>
            {data.map(datum => {
                const SecondaryLine = <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant={'body2'}>{moment(datum.start_datetime).format('HH:MM A')}</Typography>
                    <TimerOutlined /> {moment(datum.end_datetime).diff(datum.start_datetime, 'minutes')} minutes
                    <LocalFireDepartmentOutlined /> {datum.calories} Cal
                </Box>;

                return <ListItem>
                    <ListItemButton>
                        <ListItemText primary={datum.activity} secondary={SecondaryLine}></ListItemText>
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    </Sheet>
}
