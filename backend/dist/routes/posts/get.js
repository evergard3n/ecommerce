var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from "../../db/decapreted.ts";
import { PostSchemas } from "../../schemas/index.ts";
import CommonSchemas from "../../schemas/commons/index.ts";
const route = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get('/:postId', {
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
            throw app.httpErrors.notFound();
        }
        return post;
    }));
    app.get('/', {
        schema: {
            querystring: CommonSchemas.Queries.Pagination,
            response: {
                200: PostSchemas.Bodies.PostsPaginated
            }
        }
    }, ({ query: { offset, limit } }) => ({
        count: db.posts.length,
        data: db.posts.slice(offset, offset + limit),
    }));
});
export default route;
