var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017/";




app.post("/insert",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta")
        db.collection("order").insertOne(req.body,function(err,data){
            res.send(data)
        })
    })
})

app.post("/bulk",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta")
        db.collection("order").insertMany(req.body,function(err,data){
            res.send(data)
        })
    })
})

app.get("/view/:id",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta")
        db.collection('order').find({_id : ObjectId(req.params.id)}).toArray((err,data) => {

            res.send(data)

        })
        })
})
app.get("/viewall",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta")
        db.collection('order').find().toArray((err,data) => {

            res.send(data)

        })
        })
})

//delete

app.delete("/delete/:id",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("delta")
        db.collection('order').findOneAndDelete({_id : ObjectId(req.params.id)},(err,data)=>{
            res.send(data)
        })
        })
})


//update
app.patch('/updateuser/:id',(req,res) => {
    MongoClient.connect(url,(err,conn) => {
        var db = conn.db('delta');
        db.collection('order').updateOne(
            {_id : ObjectId(req.params.id)},
            {$set:req.body},
            (err,data) => {
                res.send(data)
            }
        )
    })
})



app.listen(9080)