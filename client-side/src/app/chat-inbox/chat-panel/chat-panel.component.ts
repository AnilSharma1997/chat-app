import { Component, OnInit,ViewChild,ElementRef,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit {

  @ViewChild('target') myElement: ElementRef;

  user:String;
  room:String;
  messageText:String;
  messageArray = [];
  users = [];
  constructor(private _chatService: ChatService, private router: Router) { 
    this.user = this._chatService.username;
    this.room = this._chatService.room;
    // if(!this.user || !this.room){
    //   this.leave();
    // }

    this._chatService.getRoomUsers().subscribe(
      data =>{
        this.users = data.users;
      }
    )  

    this._chatService.newMessageReceived().subscribe(
      data => {
        this.messageArray.push(data);
      });
  }

  ngOnInit() {
  }

  leave(){
    this._chatService.leaveRoom();
    this.router.navigate([''])
  }

  sendMessage()
  {
    this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    this.messageText = '';
    setTimeout(() => {
      this.scrollToElement();
    },200)
  }

  scrollToElement(){
    let element = document.getElementById('target');
    element.scrollIntoView({block: 'end'});
  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event) {
  //     debugger
  //     console.log(event)    
  // }

}
