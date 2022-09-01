import { Octokit } from "octokit";
import * as fighterRepository from '../repositories/fighterRepository.js'

export async function getStarCount (user1:string,user2:string) {
    const octokit = new Octokit({ });
    const reposUser1 = await octokit.request(`GET /users/${user1}/repos`, {});
    const reposUser2 = await octokit.request(`GET /users/${user2}/repos`, {});
    if(reposUser1.data.message||reposUser2.data.message){
        throw {code:'NotGitHubUser',message:'Could not find GitHub users'}
    }
    let countStar1 = 0
    reposUser1.data.map((x:any)=>countStar1+=x.stargazers_count)
    let countStar2 = 0
    reposUser2.data.map((x:any)=>countStar2+=x.stargazers_count)


    const recordUser1 = await fighterRepository.getFighter(user1)
    const recordUser2 = await fighterRepository.getFighter(user2)


    if(countStar1===countStar2){
        if(recordUser1.rowCount===0){
        await fighterRepository.insertVictory(user1,0,0,1)
        } else {
            await fighterRepository.updateVictory(
                user1,recordUser1.rows[0].wins,
                recordUser1.rows[0].losses,
                recordUser1.rows[0].draws+1)
        }
        if(recordUser2.rowCount===0){
            await fighterRepository.insertVictory(user2,0,0,1)
        } else {
            await fighterRepository.updateVictory(
                user2,recordUser2.rows[0].wins,
                recordUser2.rows[0].losses,
                recordUser2.rows[0].draws+1)
        }

        return ({
            winner: null,
          loser: null,
            draw: true
        })

    } else if (countStar1 > countStar2){

        if(recordUser1.rowCount===0){
        await fighterRepository.insertVictory(user1,1,0,0)
        } else {
            await fighterRepository.updateVictory(
                user1,recordUser1.rows[0].wins+1,
                recordUser1.rows[0].losses,
                recordUser1.rows[0].draws)
        }
        if(recordUser2.rowCount===0){
            await fighterRepository.insertVictory(user2,0,1,0)
        } else {
            await fighterRepository.updateVictory(
                user2,recordUser2.rows[0].wins,
                recordUser2.rows[0].losses+1,
                recordUser2.rows[0].draws)
        }

        return ({
            winner: user1,
          loser: user2,
            draw: false
        })

    } else {
        if(recordUser1.rowCount===0){
        await fighterRepository.insertVictory(user1,0,1,0)
        } else {
            await fighterRepository.updateVictory(
                user1,recordUser1.rows[0].wins,
                recordUser1.rows[0].losses+1,
                recordUser1.rows[0].draws)
        }
        if(recordUser2.rowCount===0){
            await fighterRepository.insertVictory(user2,1,0,0)
        } else {
            await fighterRepository.updateVictory(
                user2,recordUser2.rows[0].wins+1,
                recordUser2.rows[0].losses,
                recordUser2.rows[0].draws)
        }

        return ({
            winner: user2,
          loser: user1,
            draw: false
        })
    }
} 

export async function getRanking () {
    const result = await fighterRepository.getAllFighters()
    return {fighters:result.rows}
}