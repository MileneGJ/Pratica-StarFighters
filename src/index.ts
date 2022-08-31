import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routers/fighterRouters'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})