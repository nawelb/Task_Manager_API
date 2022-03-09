//connection preject to MongoDB database

const mongoose = require('mongoose');

//setting to use global JS promise
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/taskManager', {useNewUrlParser: true}).then(()=>{
    console.log('Connected to MongoDb successfully');
}).catch((e)=>{
    console.log('Error while attempting to connect to MongoDB');
    console.log(e);
});


//To prevent deprecation warnings (from MongoDB native Driver)
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
