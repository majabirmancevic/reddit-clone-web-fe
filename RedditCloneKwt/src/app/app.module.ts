import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostComponent } from './components/component/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from './components/component/side-bar/side-bar.component';
import { CommunitySideBarComponent } from './components/component/community-side-bar/community-side-bar.component';
import { ReactionButtonComponent } from './components/component/reaction-button/reaction-button.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { CreateCommunityComponent } from './components/community/create-community/create-community.component';
import { ListCommunityComponent } from './components/community/list-community/list-community.component';


import {ApiService} from './service/api.service';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {ConfigService} from './service/config.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';
import { ListPostsComponent } from './components/component/post/list-posts/list-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    PostComponent,
    HomeComponent,
    SideBarComponent,
    CommunitySideBarComponent,
    ReactionButtonComponent,
    CreatePostComponent,
    CreateCommunityComponent,
    ListCommunityComponent,
    ListPostsComponent   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
