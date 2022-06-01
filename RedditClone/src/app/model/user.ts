import { Post } from "./post";
import { UserType } from "./user-type";

export class User {

    userType: UserType = UserType.obicanKorisnik;

    constructor(
        public id: number,
        public userName: string,
        public password: string,
        public email: string,
        public avatar: string,  
        public registrationDate: string ,
        public description: string,
        public displayName: string,
        public posts : Post[] 
    ) {}


    public isAdministrator(userType: string) {
        if (userType === 'administrator') {
          return true;
        } else {
          return false;
        }
      }


      public isModerator(userType: string) {
        if (userType === 'moderator') {
          return true;
        } else {
          return false;
        }
      }

      public isObicanKorisnik(userType: string) {
        if (userType === 'obicanKorisnik') {
          return true;
        } else {
          return false;
        }
      }
}
