var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProductSchemas } from "../../schemas/index.ts";
const route = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.patch("/addSearchHistory/:userId", {
        schema: {
            params: ProductSchemas.Params.UserId,
            body: ProductSchemas.Params.ProductId,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = request.params.userId;
        const productId = request.body.productId;
        try {
            yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("user").updateOne({ user_id: userId }, { $addToSet: { search_history: productId, recommended: productId } }, { upsert: true }));
            reply.send({
                success: true,
                message: `"Product ${productId} added to search history of user ${userId}"`,
            });
        }
        catch (err) {
            console.log(err);
        }
    }));
});
export default route;
