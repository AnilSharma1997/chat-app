import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io(environment.endpoint);
  public username;
  public room;

  constructor() { }

  joinRoom(data)
  {
      this.socket.emit('join',data);
  }

  getRoomUsers(){
    let observable = new Observable<any>(observer=>{
        this.socket.on('roomUsers', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(){
    this.socket.emit('leave');
  }

  userLeftRoom(){
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('left room', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  sendMessage(data)
  {
      this.socket.emit('chatMessage',data);
  }

  newMessageReceived(){
      let observable = new Observable<any>(observer=>{
          this.socket.on('message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  setDetails(username,room){
    this.username = username;
    this.room = room;
  }
}
