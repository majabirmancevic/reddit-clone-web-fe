export class CommentPayload{
    id? : number;
    text: string;
    postId: number;
    userName?:string;
    timestamp?: string;
    userId? : number;
    parentId? : null | number;
}