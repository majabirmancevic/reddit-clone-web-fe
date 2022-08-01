export class PostModel {
    id : number;
    postName : string;
    text : string;
    reactionCount : number;
    userName : string;
    userId? : number;
    displayName: string;
    communityName : string;
    imagePath : string;
    flair?:string;
    commentCount : number;
    duration : string;
    upVote : boolean;
    downVote : boolean;
}