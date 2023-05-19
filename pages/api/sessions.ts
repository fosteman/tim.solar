import {Heartrate, Workout} from "../../models";

const ouraApiAccessToken = process.env.ouraApiAccessToken;

export default function handler(req, res) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ouraApiAccessToken}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const startDate = new Date();
    startDate.setHours(1);
    const endDate = new Date();
    endDate.setHours(24)

    fetch(
        `https://api.ouraring.com/v2/usercollection/workout`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result: {
            data: Workout[]
        }) => {
            console.log(result.data);
            res.status(200).json(result);
        })
        .catch((error) => console.log("error", error));
}
