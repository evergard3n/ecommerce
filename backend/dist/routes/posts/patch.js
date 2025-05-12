var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PostSchemas } from "../../schemas/index.ts";
import db from "../../db/decapreted.ts";
const route = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.patch('/:postId', {
        schema: {
            params: PostSchemas.Params.PostId,
            body: PostSchemas.Bodies.UpdatePost,
            response: {
                200: PostSchemas.Bodies.Post
            }
        }
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = request.params.postId;
        const post = db.posts.find(post => post.id === postId);
        if (!post) {
            throw app.httpErrors.notFound();
        }
        const updatedPost = Object.assign(Object.assign(Object.assign({}, post), request.body), { updatedAt: new Date().toISOString(), id: postId });
        db.posts = db.posts.map(post => post.id === postId ? updatedPost : post);
        return updatedPost;
    }));
});
export default route;
