//make model
import mongoose, {Schema} from "mongoose";
const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User",
    },
    channel: {
        type: Schema.Types.ObjectId,// one to whom 'subsriber' is subscribing
        ref: "User"
    }, 
},  {timestamps: true})

//user and channels both are user id
//when we subsribe to a channel, we will create a new document in the subscription collection with subscriber and channel fields populated with the respective user ids.
// same user can subscribe to multiple channels, and a channel can have multiple subscribers and a new subscription document is created for each subscription. This is a many-to-many relationship between users and channels.
//when we count the number of subscribers for a channel, we will count the number of documents in the subscription collection where the channel field is equal to the channel's user id.

export const Subscription = mongoose.model("Subscription", subscriptionSchema);