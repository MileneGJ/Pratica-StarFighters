import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routers/fighterRouters.js'
import errorHandler from './middlewares/errorHandler.js'
import 'express-async-errors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})