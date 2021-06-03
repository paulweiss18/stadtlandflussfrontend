import axios from 'axios';

const LOBBY_API_BASE_URL = "http://localhost:8090/lobby";

class LobbyService {

    createPlayer(username){
        return axios.post(LOBBY_API_BASE_URL + '/createPlayer', {
            name: username
        });
    }

    createLobby(playerid){
        return axios.post(LOBBY_API_BASE_URL + '/createLobby',{
            playerid: playerid
        });
    }
    joinLobby(username, lobbycode){
        return axios.post(LOBBY_API_BASE_URL + '/joinLobby',{
            playerId: username,
            lobbyCode: lobbycode
        });
    }
}

export default new LobbyService()