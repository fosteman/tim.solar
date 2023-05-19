import {Heartrate} from "../../models";
import {requestOuraApi} from "./helper";



export default function handler(req, res) {
    const startDate = new Date();
    startDate.setHours(1);
    const endDate = new Date();
    endDate.setHours(24)

    return requestOuraApi(`usercollection/heartrate?start_datetime=${startDate.toJSON()}&end_datetime=${endDate.toJSON()}`)
        .then((result: {
            data: Heartrate[]
        }) => {
            res.status(200).json(result);
        })
        .catch((error) => console.log("error", error));
}
