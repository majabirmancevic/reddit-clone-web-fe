import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
