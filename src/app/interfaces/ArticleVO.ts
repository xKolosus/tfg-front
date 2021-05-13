import { PostVO} from './PostVO';
import { CategoryVO } from "./CategoryVO";
import { UserVO } from "./UserVO";

export interface ArticleVO {
    articleId : Number,
    articleTitle : String,
    articleContent : String,
    createdAt : Date,
    articleImageUrl : String,
    category : CategoryVO,
    posts : PostVO[],
    user : UserVO
}
