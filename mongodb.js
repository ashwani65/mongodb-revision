const mongoose = require("mongoose");

// .connect method returns a promise,connection creation and cretions a new db(if not present)
mongoose.connect("mongodb://localhost:27017/testDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection successful...");
}).catch((err)=>{
    console.log(err);
});

// schema
const playlistSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    ctype : String,
    videos : String,
    author : String,
    active : Boolean,
    date : {
        type : Date,
        default :Date.now
    }
})

// model (Friends class hogi yha,singular form m hona chaiye), collection creation
const Playlist = new mongoose.model("Playlist",playlistSchema);

// INSERT DOCUMENT
const createDocument = async ()=>{
    try{
        const nodePlaylist = new Playlist({
            name : "Node JS",
            ctype : " Back Front",
            videos : 50,
            author : "John Doe",
            active : true,
        })
        const result = await nodePlaylist.save();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

// createDocument();


// INSERT MULTIPLE DOCUMENTS
const createDocument = async ()=>{
    try{
        const jsPlaylist = new Playlist({
            name : "javascript",
            ctype : " Front Front",
            videos : 150,
            author : "John Doe tech",
            active : false,
        })
        
        const mongoPlaylist = new Playlist({
            name : "mongodb",
            ctype : " Database",
            videos : 15,
            author : "John Doe tech",
            active : true,
        })

        const mongoosePlaylist = new Playlist({
            name : "mongoose",
            ctype : " Database",
            videos : 5,
            author : "John Doe tech",
            active : true,
        })
        
        const expressPlaylist = new Playlist({
            name : "Express JS",
            ctype : " Database",
            videos : 20,
            author : "John Doe tech",
            active : true,
        })

        const result = await Playlist.insertMany(
            [
                jsPlaylist,
                mongoPlaylist,
                mongoosePlaylist,
                expressPlaylist,
            ]
        ).save();

        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

// createDocument();

// READ QUERIES
const getDocument = async ()=>{
    try{
        const result = await Playlist.find({
            ctype:" Database"
        }).select({name:1,_id:0}).limit(2).skip(1);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

// getDocument();

// COMPARISION OPERATORS ($eq,$gt,$gte,$in,$lt,$lte,$ne,$nin)

// Q1 : get info for videos >=50

const getCompQuery = async ()=>{
    try{
        const result = await Playlist.
        find({
            /*videos:{
                $gte : 50
                
            }},*/
            ctype : {
                // $in:["Database","Backend"]
                $nin:["Database","Backend"]
            }}
        ).select({name:1,_id:0});

        console.log(result);
        const temp = await Playlist.find();
        // console.log(temp);
    }
    catch(err){
        console.log(err);
    }
}

// getCompQuery();

// LLOGICAL QUERIES ($and,$not,$nor,$or)

const getlogicalQuery = async ()=>{
    try{
        const result = await Playlist.
        find({
            /*$or : [{
                ctype: "Backend"
            },{
                author : "John Doe"
            }]*/

            $and : [{
                ctype: "Backend"
            },{
                author : "John Doe"
            }]
        }).select({name:1});
        console.log(result);

    }
    catch(err){
        console.log(err);
    }
}
// getlogicalQuery();

// SORTING AND COUNTING QUERIES

// COUNT
const getCount = async ()=>{
    try{
        const result = await Playlist.
        find({
            active:true
        }).select({name:1}).countDocuments();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// getCount();

// SORT()
const getSort = async ()=>{
    try{
        const result = await Playlist.
        find({
            // active:true
            author:"John Doe tech"
        // }).select({name:1}).sort({name:1}); // asc
        }).select({name:1}).sort({name:-1}); // dsc
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// getSort();

// UPDATE(https://docs.mongodb.com/manual/reference/operator/update/)

const updateDocument = async (id)=>{
    try{
        const result = await Playlist.
        findByIdAndUpdate({_id : id},{
            $set : {
                name : 'JavascriptUpdated Again'
            }
        },{
            new : true,
            userFindAndModify: false
        });

        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// updateDocument('5fcf1f05b07adb289b1717c1');

// DELETE() :

const deleteDocument = async (_id)=>{
    try{
        const result = await Playlist.deleteOne({_id});
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// deleteDocument('5fcf1f05b07adb289b1717c1');

// Delete Many
const deleteManyDocument = async ()=>{
    try{
        const result = await Playlist.deleteMany({active:false});
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// deleteManyDocument();


// BUILT-IN VALIDATION
const playlistSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [2,"minimum two letters"],
        maxlength: 30
    },
    ctype : {
        type :String,
        required : true,
        enum:['Frontend','Backend','Database','UI/UX']
    },
    videos : Number,
    author : String,
    active : Boolean,
    date : {
        type : Date,
        default :Date.now
    }
})

// CUSTOM VALIDATION
const playlistSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [2,"minimum two letters"],
        maxlength: 30
    },
    ctype : {
        type :String,
        required : true,
        enum:['Frontend','Backend','Database']
    },
    videos : {
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Count can not be negative')
            }
        },
        // both above and below methods will work in same
        validate :{
            validator:(value)=>{
                return value.length<0
            },
            message:'count can not be negative'
        }
    },
    author : String,
    active : Boolean,
    date : {
        type : Date,
        default :Date.now
    }
})

// NPM VALIDATOR PACKAGE
/* 
    This library validates and sanitizes strings only.

    If you're not sure if your input is a string, coerce it using input + ''. Passing anything other than a string is an error.
*/
const validator  = require('validator');
const playlistSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [2,"minimum two letters"],
        maxlength: 30
    },
    ctype : {
        type :String,
        required : true,
        enum:['Frontend','Backend','Database']
    },
    videos : {
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Count can not be negative')
            }
        },
    },
    author : String,
    active : Boolean,
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is inValid");
            }
        }
    },
    date : {
        type : Date,
        default :Date.now
    }
})
