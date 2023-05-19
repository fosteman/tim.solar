// to whom ever concerned with my key - it's been revoked and re-installed.
import {Workout} from "../../models";

const ouraApiAccessToken = process.env.ouraApiAccessToken;
export const requestOuraApi = (url: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ouraApiAccessToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    return fetch(
        `https://api.ouraring.com/v2/${url}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result: {
            data: any[]
        }) => result.data)
}
