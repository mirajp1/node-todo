//dummy data for now
var items=[{item:'do cs homework'},{item: 'watch news'},{item:'buy chocolates'}];
var bodyParser = require('body-parser');

var urlEncodedParser= bodyParser.urlencoded({extended:false});

module.exports=function(app){

    app.get('/todo',function(req,res){
        res.render('todo',{items:items});
    });

    app.post('/todo',urlEncodedParser,function(req,res){
        items.push(req.body);
        res.render('todo',{items:items});
    });

    app.delete('/todo/:item',function(req,res){
        console.log(req.params.item);
        var del = req.params.item;

        for(var i=0;i<items.length;i++){
            if(items[i].item === del){
                items.splice(i,1);
                break;
            }
        }
        res.render('todo',{items:items});
    });

};
