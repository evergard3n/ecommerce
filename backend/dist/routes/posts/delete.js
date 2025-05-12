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
    app.delete('/:postId', {
        schema: {
            params: PostSchemas.Params.PostId,
            response: {
                200: PostSchemas.Bodies.Post
            }
        }
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = request.params.postId;
        const post = db.posts.find(post => post.id === postId);
        if (!post) {
            reply.status(404);
        }
        else {
            db.posts = db.posts.filter(post => post.id !== postId);
            return post;
        }
    }));
});
export default route;
