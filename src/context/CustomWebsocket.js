
const DEFAULT_URL = 'ws://localhost:8090/stadtlandfluss'

export class CustomWebsocket{

    socketUrl = DEFAULT_URL;
    webSocket: WebSocket;

    playerID: string;
    onReceiveMessage: MessageEvent;
    onCloseConnection: Event;


    constructor(playerID, url= DEFAULT_URL){
        this.playerID = playerID;
        this.socketUrl = url;
        this.webSocket = new WebSocket(this.socketUrl);
        this.connect();
    }

    onMessage = (event) =>{
        this.onReceiveMessage(event);
    }

    onOpen = (Event) => {
        this.webSocket.send(
            JSON.stringify({
                type: "init",
                playerId: this.playerID})
            );
    }


    connect = () =>{
        if(this.webSocket.readyState === this.webSocket.CLOSED){
            this.webSocket = new WebSocket(this.socketUrl)
        }

        this.webSocket.onopen = this.onOpen;
        this.webSocket.onclose = this.disconnect;
        this.webSocket.addEventListener('message', this.onMessage)
    }

    async sendMessage (msg){
        if(this.webSocket.readyState === this.webSocket.OPEN){
            console.log(msg);
            this.webSocket.send(msg);
        }
    }

    disconnect = (Event) =>{
        console.log("asdf");
        this.webSocket.send(
            JSON.stringify({
                type: "connection_closed",
                playerId: this.playerID})
            );
    }

}