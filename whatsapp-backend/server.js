//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import cors from 'cors';
import Pusher from 'pusher';


//app config
//creating application helping us to write api routes
const app= express()
const port= process.env.PORT || 9000

    //to make database realtime using mongo db we use pusher
    //whenever there is a change, changestream triggers pusher and will upload message to pusher, we will connect it to frontend and pusher server will trigger our frontend and pushes down our data
    //we will make new req to backend and that will refresh everything and make it realtime
    //frontend to backend gets stored backend to pusher and pusher to frontend and frontend reloads the data
const pusher = new Pusher({
    appId: "1403932",
    key: "4b54627c5e3e55416b05",
    secret: "95e7d9f2f12c0f9066f4",
    cluster: "ap2",
    useTLS: true
  });


// //middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

// // //db config

const connection_url="mongodb+srv://admin:Allhailbruno18@cluster0.nnuln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// //??
const db= mongoose.connection;
db.once('open', () => {
    console.log("db connected");

    const msgCollection=db.collection("messagecontents");
    const changeStream= msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);

    if(change.operationType==='insert'){
        const messageDetails= change.fullDocument;
        pusher.trigger('messages','inserted',
        {
            message: messageDetails.message,
            name: messageDetails.name,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received,
        });
    }
    else{
        console.log('error triggering pusher')
    }
    });
});

// //api routes

app.get('/messages/sync',(req,res)=>{

    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res)=>{
    const dbMessage= req.body
    //uses mongoose to create a nw message using data sent in the body
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

//listen
var str1='listening on local host: ';
var str2=port
var str3= str1.concat(str2);
app.listen(port,()=>console.log(str3));
