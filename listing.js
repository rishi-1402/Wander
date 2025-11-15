const mongoose = require("mongoose");
const review = require("./review");

const schema = mongoose.Schema;

const listingSchema = new schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "review",
        },
    ],
});
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await review.deleteMany({
            _id: {
                $in: listing.reviews,
            },
        });
    }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;