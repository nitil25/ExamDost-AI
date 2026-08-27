import express from "express"
import { generateNotes } from "../controller/generate.controller.js"
import isAuth from "../middlewares/isAuth.js"
import { getMyNotes, getSingleNotes } from "../controller/notes.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes", isAuth ,generateNotes)
notesRouter.get("/getnotes",isAuth,getMyNotes)
notesRouter.get("/:id",isAuth,getSingleNotes)


export default notesRouter
