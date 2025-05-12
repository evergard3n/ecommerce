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
    app.get("/variations/:productId", {
        schema: {
            params: ProductSchemas.Params.ProductId,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const productId = request.params.productId;
        try {
            const targetDevice = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("phone-main").findOne({ product_id: productId }));
            const variations = yield ((_b = app.mongo.db) === null || _b === void 0 ? void 0 : _b.collection("phone-main").aggregate([
                { $match: { name: targetDevice === null || targetDevice === void 0 ? void 0 : targetDevice.name } },
                {
                    $group: {
                        _id: "$storage", // group theo storage
                        doc: { $first: "$$ROOT" } // lấy bản ghi đầu tiên của mỗi nhóm
                    }
                },
                {
                    $replaceRoot: { newRoot: "$doc" } // chuyển doc thành root document
                }
            ]).toArray());
            reply.send(variations);
        }
        catch (err) {
            console.log(err);
        }
    }));
});
export default route;
