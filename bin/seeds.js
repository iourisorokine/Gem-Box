// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/gem-box', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

const gems=[
  // example 1
  {
    title: "Niagara Waterfall",
    description: "we captured this amazing picture of the world famous marvel",
    good_to_know: "water is cold",

    image_url: "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    creator: "",
    discovery: true,
    category:"Nature",
    visitedDate: "",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  // example 2
  {
    title: "This super spot",
    description: "That's a very cool spot, we just ca't believe that",
    good_to_know: "Spot spot spot",

    image_url: "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    creator: "",
    discovery: true,
    category:"Nature",
    visitedDate: "",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },

    // example 3
    {
      title: "Hiking in the Mountains",
      description: "That's a very cool spot, we just ca't believe that",
      good_to_know: "for advanced hickers only",
  
      image_url: "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
      creator: "",
      discovery: true,
      category:"Hikes",
      visitedDate: "",
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    },

        // example 4
        {
          title: "Hiking in the Mountains",
          description: "That's a very cool spot, we just ca't believe that",
          good_to_know: "for advanced hickers only",
      
          image_url: "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
          creator: "",
          discovery: true,
          category:"Hikes",
          visitedDate: "",
          timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
          }
        },

            // example 5
    {
      title: "The History museum",
      description: "Discover the history and cultureof locals and ravel trough time",
      good_to_know: "20usd admission fee",
  
      image_url: "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
      creator: "",
      discovery: true,
      category:"cultureArt",
      visitedDate: "",
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    }

]





User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})