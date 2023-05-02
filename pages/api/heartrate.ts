import {Heartrate} from "../../models";

const ouraApiAccessToken = "BVQIHXLPXQD65Q7AWMFBR5MJTB6HDB3O";

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
        `https://api.ouraring.com/v2/usercollection/heartrate?start_datetime=${startDate.toJSON()}&end_datetime=${endDate.toJSON()}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result: {
            data: Heartrate[]
        }) => {
            res.status(200).json(result);
        })
        .catch((error) => console.log("error", error));
}
