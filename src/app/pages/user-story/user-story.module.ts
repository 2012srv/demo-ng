import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStoryRoutingModule } from './user-story-routing.module';
import { UserStoryComponent } from './user-story/user-story.component';


@NgModule({
  declarations: [
    UserStoryComponent
  ],
  imports: [
    CommonModule,
    UserStoryRoutingModule
  ]
})
export class UserStoryModule { }
