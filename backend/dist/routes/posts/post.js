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
    app.post('/', {
        schema: {
            body: PostSchemas.Bodies.CreatePost,
            response: {
                201: PostSchemas.Bodies.Post
            }
        }
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const postContent = request.body;
        const post = {
            id: db.posts.length + 1,
            content: postContent.content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: {
                id: '1',
                display_name: 'John Doe',
                username: 'johndoe'
            }
        };
        db.posts.push(post);
        reply.status(201);
        return post;
    }));
});
export default route;
