import axios from 'axios';

const LOBBY_API_BASE_URL = "http://localhost:8090/lobby";

class LobbyService {

    createLobby(username){
        return axios.post(LOBBY_API_BASE_URL + '/createLobby',{
            name: username
        });
    }
    joinLobby(username, lobbycode){
        return axios.post(LOBBY_API_BASE_URL + '/joinLobby',{
            name: username,
            code: lobbycode
        });
    }
}

export default new LobbyService()