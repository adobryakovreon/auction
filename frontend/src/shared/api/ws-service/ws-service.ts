import { WS_URL } from './lib/const';

export function WebSocketApi() {
    let ws: WebSocket | null = null;

    function createWsConnection() {
        ws = new WebSocket(`${WS_URL}`);
        ws.onerror = makeError;
        ws.onmessage = function (event: MessageEvent) {
            console.log(JSON.parse(event.data));
        };
    }
    
    function checkWSConnection(ws: WebSocket) {
        return ws.readyState === ws.OPEN;
    }

    function sendPing() {
        const isWSOpen = ws && checkWSConnection(ws);
        if (isWSOpen && ws) {
            ws.send(JSON.stringify({ type: 'PING' }));
        } else {
            createWsConnection();
        }
    }

    function makeError() {
        throw new Error('The Remote server is not available');
    }

    return () => {
        createWsConnection();
        setInterval(sendPing, 10000);
    };
}
