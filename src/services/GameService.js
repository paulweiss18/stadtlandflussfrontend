import axios from "axios";


const LOBBY_API_BASE_URL = "http://localhost:8090/game";

class GameService{

    startGame(playerId, lobbyCode){
       return axios.post(LOBBY_API_BASE_URL + '/startGame',{
            lobbyCode: lobbyCode,
            playerId: playerId
        });
    }
}

export default new GameService();