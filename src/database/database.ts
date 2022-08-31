import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {Pool} = pg

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:147MgJ@localhost:5432/starfighters'

const connection = new Pool({
    connectionString:DATABASE_URL
})

export default connection