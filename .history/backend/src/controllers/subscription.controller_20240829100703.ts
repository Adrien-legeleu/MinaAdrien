import {type Response} from "express"

export class SubscriptionController {
    async createSubscription(res:Response , req:any) : Promise<void> {
        try {
            
        } catch (error:any) {
            console.log(error);
            res.status(500).send({
                error : error?;message
            })
        }
    }
}