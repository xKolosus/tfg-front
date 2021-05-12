import { Article } from "./Article";
import { User } from "./User";

export class Post {
    postId : Number;
    user: User;
    postTitle : String;
    postContent : String;
    postLikes : Number;
    postDislikes : Number;
    createdAt : Date;
    article : Article;
}