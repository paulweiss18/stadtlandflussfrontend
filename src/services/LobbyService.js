import axios from 'axios';

const LOBBY_API_BASE_URL = "http://10.0.0.25:8090/lobby";

class LobbyService {

    createPlayer(username){
        return axios.post(LOBBY_API_BASE_URL + '/createPlayer', {
            name: username
        });
    }

    createLobby(playerid){
        return axios.post(LOBBY_API_BASE_URL + '/createLobby',{
            playerId: playerid
        });
    }

    joinLobby(playerid, lobbycode){
        return axios.post(LOBBY_API_BASE_URL + '/joinLobby',{
            playerId: playerid,
            lobbyCode: lobbycode
        });
    }

    getLobby(lobbycode){
        return axios.post(LOBBY_API_BASE_URL + '/getLobby',{
            code: lobbycode
        });
    }

    saveGameConfiguration(playerId, lobbyCode, numberOfRounds, excludedLetters, categories){
        return axios.post(LOBBY_API_BASE_URL + '/setConfiguration',{
            playerId: playerId,
            lobbyCode: lobbyCode,
            numberOfRounds: numberOfRounds.toString(),
            excludedLetters: excludedLetters,
            categories: categories
        });
    }

}

export default new LobbyService()