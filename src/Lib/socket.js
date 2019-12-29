import Ws from '@adonisjs/websocket-client';


export class SocketConnection {
  connect (token) {
    this.ws = Ws('wss://adonis-sockets-api.herokuapp.com/')
      .withApiToken(token)
      .connect();

    this.ws.on('open', () => {
      console.log('Connection initialized')
    });

    this.ws.on('close', () => {
      console.log('Connection closed')
    });

    return this
  }

  subscribe (channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000)
    } else {
      const result = this.ws.subscribe(channel);

      result.on('message', message => {
        console.log('Incoming', message);
        handler(message)
      });

      result.on('error', (error) => {
        console.error(error)
      });

      return result
    }
  }
}

export default new SocketConnection()
