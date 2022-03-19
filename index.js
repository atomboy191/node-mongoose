const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");

    var firstDish = Dishes({
        name: "salad",
        description: "test",
        hobby: "yes"
    });

    firstDish.save().then((dish) => console.log(dish)).catch((err) => console.log(err));

    Dishes.create({
        name: "Uthappizza",
        description: "test",
    })
    .then((dish) => {
        console.log("print dish just added")
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'Updated test'}
        }, { new: true 
        }).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'very good',
            author: 'Nick Tabing'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log("after comment");
        console.log(dish);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    }) 
    .catch((err) => {
        console.log(err);
    });
});