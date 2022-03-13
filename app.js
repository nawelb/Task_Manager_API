const express = require('express');
const app = express();
const {mongoose} = require('./db/mongoose');
const port=process.env.port ||3000;
const bodyParser = require('body-parser');

//load in the mongoose models
const {Task} = require('./db/models/task.model');
const {List} = require('./db/models/list.model');

//load middleware
app.use(bodyParser.json());

 // CORS enabled with express/node-js : 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");                                                                          
    
    //ou avec  "www.xyz.com" à la place de "*" en production   
    res.header("Access-Control-Allow-Headers",                    
        "Origin, X-Requested-With, Content-Type, Accept");  
    next(); 
    }
); 

/* LISTE ROUTES*/

/**
 * GET /listes
 * Get all listes
 * Return an array of all the list
 */
app.get('/listes', (req,res)=>{
    //res.send("Hello World !")
    List.find().then((lists) => {
        res.send(lists);
    })
})

/**
 * POST /liste
 * Create new list & return it to user
 * field via JSON request body
 */
app.post('/liste', (req,res)=> {
    //
    let title =req.body.title;
    let newList= new List({
        title
    });
    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
})

/**
 * PATCH /liste/:id
 * Update the liste with id
 * new values in JSON body
 */
app.patch('/liste/:id', (req,res) =>{
    //
    List.findOneAndUpdate({_id: req.params.id}, {
        $set:req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/**
 * DELETE /liste/:id
 * delete a specifique liste with id
 */
// A REVOIR 
app.delete('/liste/:id', (req, res) =>{
    // findOneAndRemove({_id:req.params.id})
    List.findOneAndRemove({_id:req.params.id}, {
        $set:req.body
    }).then((newlist) => {
        res.send(newlist);
    })
})

/**
 * GET /liste/:listeId/tasks
 * get all tasks in a specific list
 */
app.get('/liste/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId,
    }).then((tasks) => {
        res.send(tasks);
    })
});

/**
 * GET /liste/:listId/tasks/:taskId
 * get a specific task in a specific list
 */
 app.get('/liste/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _listId: req.params.listId, 
        _id: req.params.taskId
    }).then((task) => {
        res.send(task);
    });
})

/**
 * POST /liste/:listeId/tasks
 * create a new task in a specific liste
 */
app.post('/liste/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title, 
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        console.log(newTaskDoc);
        res.send(newTaskDoc);
    });
});

/**
 * PATCH /liste/:listId/tasks/:taskId
 * update a specific task in a specific list
 */
app.patch('/liste/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _listId: req.params.listId, 
        _id: req.params.taskId
    }, {
        $set:req.body
    }).then(() => {
        res.sendStatus(200);
    });
})

/**
 * DELETE /liste/:listID/tasks/:taskId
 * delete a specific task in a specific list
 */
app.delete('/liste/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _listId: req.params.listId, 
        _id: req.params.taskId
    }).then(() => {
        res.sendStatus(200);
    })
})

app.listen(3000, ()=> {
    console.log(`Running on port ${port}`);
});
