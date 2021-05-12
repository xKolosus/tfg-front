import { Category } from "./Category";
import { Post } from "./Post";
import { User } from "./User";

export class Article {
    articleId : Number;
    articleTitle: String;
    articleContent : String;
    createdAt : Date;
    articleImgUrl : String = null;
    category : Category;
    posts : Post[];
    user : User;
}