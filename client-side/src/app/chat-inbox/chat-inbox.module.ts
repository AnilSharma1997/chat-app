import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChatInboxComponent } from '../chat-inbox/chat-inbox.component';
import { ChatService } from '../chat-inbox/service/chat.service';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';

const routes: Routes = [
  {path: '', component: ChatInboxComponent},
  {path:'chat-panel', component: ChatPanelComponent}
];

@NgModule({
  declarations: [ChatInboxComponent, ChatPanelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers:[ChatService]
})
export class ChatInboxModule { }
