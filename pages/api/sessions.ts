import {Workout} from "../../models";
import {requestOuraApi} from "./helper";

export default function handler(req, res) {
    const startDate = new Date();
    startDate.setHours(1);
    const endDate = new Date();
    endDate.setHours(24)

    requestOuraApi(`usercollection/workout`)
        .then((data: Workout[]) => {
            res.status(200).json(data)
        })
        .catch((error) => console.log("error", error));
}
