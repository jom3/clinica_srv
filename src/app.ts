import 'dotenv/config'
import "reflect-metadata"
import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('', (req, res)=>{
  res.send('hola mundo')
})

app.listen(port, ()=> console.log(`Server listening on port ${port}`))