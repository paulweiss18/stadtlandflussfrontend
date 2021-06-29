import axios from "axios";


const LOBBY_API_BASE_URL = "http://localhost:8090/game";

class GameService{

    startGame(playerId, lobbyCode){
       return axios.post(LOBBY_API_BASE_URL + '/startGame',{
            lobbyCode: lobbyCode,
            playerId: playerId
        });
    }

    finishRound(playerId, lobbyCode, answers){
        return axios.post(LOBBY_API_BASE_URL + '/finishRound',{
            lobbyCode: lobbyCode,
            playerId: playerId,
            answers: answers
        });
    }

    votePlayer(playerId, score){
        return axios.post(LOBBY_API_BASE_URL + '/voteRound',{
            playerId: playerId,
            score: score
        });
    }

    nextRound(lobbyCode){
        return axios.post(LOBBY_API_BASE_URL + '/nextRound',{
            lobbyCode: lobbyCode
        });
    }


}

export default new GameService();