import { ReactionType } from './reaction-type';

export class VotePayload {
    reactionType: ReactionType;
    postId: number;
}