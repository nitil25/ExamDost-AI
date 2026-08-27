import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true,
    },
    topic:{
        type:String,
        required:true
    },
    classLevel:{
        type:String
    },
    examType:{
        type:String
    },
    revisionMode:{
        type:Boolean,
    },
    includeDiagram:{
        type:Boolean,
    },
    includeChart:{
        type:Boolean,
    },
    content:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
},{timestamps:true})

const Notes = mongoose.model("Notes", notesSchema)
export default Notes
