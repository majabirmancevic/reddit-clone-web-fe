import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';

  private _user_url = this._api_url + '/auth';
  private _community_url = this._api_url + '/community/'
  private _post_url = this._api_url + '/posts/'

  //                 LOGIN
  private _login_url = this._user_url + '/login';

  get login_url(): string {
    return this._login_url;
  }

  //                 SIGNUP
   private _signup_url = this._user_url + '/signup';

   get signup_url(): string {
     return this._signup_url;
   }

  //                COMMUNITY 
  
  // ../api/community/
  get community_url(): string {
    return this._community_url;
  }

  private _updateCommunity_url = this._community_url + 'edit/';

  get updateCommunity_url(): string {
    return this._updateCommunity_url;
  }
  
//                    POST 

//  ../api/posts/
get post_url(): string {
  return this._post_url;
}

private _getPostsByCommunity_url = this._post_url + 'byCommunity/';

get getPostsByCommunity_url(): string {
  return this._getPostsByCommunity_url;
}

private _getPostsByUser_url = this._post_url + 'byUser/';

get getPostsByUser_url(): string {
  return this._getPostsByUser_url;
}

private _updatePost_url = this._post_url + 'edit/';

get updatePost_url(): string {
  return this._updatePost_url;
}

}
