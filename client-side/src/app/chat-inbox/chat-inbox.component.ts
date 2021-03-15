import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {

  public user:String;
  public room:String;
  constructor(private _chatService:ChatService, private route: Router) { 
  }

  ngOnInit() {
  }

  joinChat(){
    if(!this.user || !this.room){
      return
    }
    this._chatService.setDetails(this.user,this.room);
    this._chatService.joinRoom({user:this.user, room:this.room});
    this.route.navigate(['/chat-panel']);
  }

}
