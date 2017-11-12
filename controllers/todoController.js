//dummy data for now
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');

var urlEncodedParser= bodyParser.urlencoded({extended:false});

//Connect to our test mongoDB database on mlab.com
mongoose.connect('mongodb://'+
                config['development']['database'].user+
                ':'+
                config['development']['database'].password+
                '@'+
                config['development']['database'].host+
                ':'+
                config['development']['database'].port+
                '/'+
                config['development']['database'].db
            );

var todoSchema = new mongoose.Schema({
    item:String
});

//model to be stored in DB
var Todo = mongoose.model('Todo',todoSchema);


module.exports=function(app){

    app.get('/todo',function(req,res){

        Todo.find({},function(err,data){
            res.render('todo',{items:data});
        })
    });

    app.post('/todo',urlEncodedParser,function(req,res){
        var newItem = Todo(req.body).save(function(err,data){
            if(err)
                throw err;

            console.log('saved');
            console.log(req.body);
            Todo.find({},function(err,data){
                res.render('todo',{items:data});
            });
        });
        // items.push(req.body);
        // res.render('todo',{items:items});
    });

    app.delete('/todo/:item',function(req,res){
        console.log('delete: ' +req.params.item);

        Todo.find({item:req.params.item}).remove(function(err,data){
            if(err)
                throw err;

            console.log('removed: '+req.params.item);
            Todo.find({},function(err,data){
                res.render('todo',{items:data});
            });
        })

    });

};
