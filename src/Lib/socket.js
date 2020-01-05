import Ws from '@adonisjs/websocket-client';


export class SocketConnection {
  connect (token) {
    this.ws = Ws("wss://travel-to-api.herokuapp.com/")
      .withApiToken(token)
      .connect();

    this.ws.on('open', () => {
      //console.log('Connection initialized')
    });

    this.ws.on('close', () => {
      //console.log('Connection closed')
    });

    return this
  }

  subscribeToMessage (channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000)
    } else {
      const result = this.ws.subscribe(channel);

      result.on('message', message => {
        //console.log('Incoming', message);
        handler(message)
      });

      console.log(result)

      result.on('error', (error) => {
        console.error(error)
      });

      return result
    }
  }

  subscribeToNotification (channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000)
    } else {
      const result = this.ws.subscribe(channel);

      result.on('notification', notification => {
        console.log('Incoming', handler);
        handler(notification)
      });

      console.log(result)

      result.on('error', (error) => {
        console.error(error)
      });

      return result
    }
  }
}

export default new SocketConnection()
