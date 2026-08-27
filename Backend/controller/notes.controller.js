import Notes from '../models/notes.model.js'

// get all notes of the user
export const getMyNotes = async(req,res) => {
    try {
        const notes = await Notes.find({user:req.userId}).select("topic classLevel examType revisionMode includeDiagram includeChart createdAt").sort({createdAt:-1})
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json({
            message:`Get notes error : ${error.message}`
        })
    }
}

// get the single notes of the user
export const getSingleNotes = async(req,res) => {
    try {

        const notes = await Notes.findOne({_id:req.params.id,user:req.userId})

        if(!notes){
            return res.status(404).json({
                message:`Notes not found`
            })
        }

        return res.status(200).json({
            content:notes.content,
            topic:notes.topic,
            createdAt:notes.createdAt
        })

    } catch (error) {
        return res.status(400).json({
            message:`Find notes error : ${error.message}`
        })
    }
}
