import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './components/community/community/community.component';
import { CreateCommunityComponent } from './components/community/create-community/create-community.component';
import { ListCommunityComponent } from './components/community/list-community/list-community.component';
import { ListPostsComponent } from './components/component/post/list-posts/list-posts.component';
import { PostComponent } from './components/component/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { ViewPostComponent } from './components/post/view-post/view-post.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UpdateProfileComponent } from './components/user/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/user/profile/view-profile/view-profile.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'list-communities', component: ListCommunityComponent },
  { path: 'list-posts', component: ListPostsComponent },
  { path: 'create-community', component: CreateCommunityComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component : PostComponent},
  { path: 'community/:id', component : CommunityComponent},
  { path: 'view-profile/:name', component: ViewProfileComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'update-profile/:id', component: UpdateProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
