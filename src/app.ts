import 'dotenv/config'
import "reflect-metadata"
import express from 'express'
import cors from 'cors'
import { connection } from './config/db.config'
import { appRouter } from './routes/app.routes'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

connection()

app.use(appRouter)

app.listen(port, ()=> console.log(`Server listening on port ${port}`))