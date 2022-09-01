import connection from "../database/database.js";

export async function insertVictory(user: string, win: number,loss: number,draw: number) {
    return await connection.query(
        'INSERT INTO fighters (username,wins,losses,draws) VALUES ($1,$2,$3,$4)',
        [user,win,loss,draw])
}
export async function updateVictory(user: string, win: number,loss: number,draw: number) {
    return await connection.query(
        'UPDATE fighters SET wins=$1,losses=$2,draws=$3 WHERE username=$4',
        [win,loss,draw,user])
}

export async function getFighter(user:string){
return await connection.query(
    'SELECT * FROM fighters WHERE username=$1',
    [user])
}

export async function getAllFighters(){
    return await connection.query(
        'SELECT * FROM fighters ORDER BY wins DESC,draws DESC'
    )
}