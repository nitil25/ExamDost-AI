import express from 'express'
import { downloadPdf } from '../controller/pdf.controller.js'
import isAuth from '../middlewares/isAuth.js'

const pdfRouter = express.Router()

pdfRouter.post("/generate-pdf", isAuth, downloadPdf)

export default pdfRouter