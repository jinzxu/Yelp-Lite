const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Site = require("../models/campground");

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

//This file is used to populate our campgrounds collection for development 

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Site.deleteMany({}); //completely empties out the database so we can reseed
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000); //randomizing the index for different cities
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Site({
            author: 'jasonxu', //My user ID 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet error deleniti sapiente delectus ad explicabo illum fugit dolorem, asperiores neque? Ullam nesciunt illo dignissimos inventore nihil repellendus, molestiae necessitatibus quo?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: '',
                    filename: '',
                },
                {
                    url: '',
                    filename: '',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})