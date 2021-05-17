import { Category } from "./Category";
import { Post } from "./Post";
import { User } from "./User";

export class Article {
    articleId : Number;
    articleTitle: String;
    articleContent : String;
    createdAt : Date;
    articleImageUrl : String = "../../assets/default.jpg";
    category : Category;
    posts : Post[];
    user : User;
}
