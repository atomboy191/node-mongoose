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

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log('print dishes')
        console.log(dishes);

        return Dishes.remove({});
    })
    .catch((err) => {
        console.log(err);
    });
});