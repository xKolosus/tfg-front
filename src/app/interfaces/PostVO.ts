import { ArticleVO } from "./ArticleVO";
import { UserVO } from "./UserVO";

export interface PostVO {
    postId : Number,
    user : UserVO,
    postTitle : String,
    postContent : String,
    postLikes : Number,
    postDislikes : Number,
    createdAt : Date,
    article : ArticleVO
}