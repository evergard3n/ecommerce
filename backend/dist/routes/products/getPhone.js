var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProductSchemas, CommonSchemas } from "../../schemas/index.ts";
const route = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get("/phone/:productId", {
        schema: {
            params: ProductSchemas.Params.ProductId,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { productId } = request.params;
        try {
            const phoneCollection = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("phone-main").findOne({ product_id: productId }));
            reply.send(phoneCollection);
        }
        catch (error) {
            console.error(error);
        }
    }));
    app.get("/phone/technical", {
        schema: {
            querystring: ProductSchemas.Params.ProductId,
            response: {
                200: ProductSchemas.Bodies.PhoneTechnicalDetails,
            },
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { productId } = request.query;
        try {
            const phone_technical = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("phone-main-technical").findOne({ product_id: productId }));
            if (phone_technical) {
                const selectedProps = {
                    product_id: phone_technical.product_id,
                    screen: phone_technical.screen,
                    camera_front: phone_technical.camera_front,
                    camera_back: phone_technical.camera_back,
                    cpu: phone_technical.cpu,
                    battery: phone_technical.battery,
                };
                reply.send(selectedProps);
            }
            else {
                throw new Error(`Product with id ${productId} not found`);
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
    app.get("/phone/cover", {
        schema: {
            querystring: ProductSchemas.Params.Url,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { url } = request.query;
        try {
            const phone_cover = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("phone-main-cover").findOne({ url: url }));
            if (phone_cover) {
                const selectedProps = {
                    product_id: phone_cover.product_id,
                    cover_image: phone_cover.cover_image,
                };
                return selectedProps;
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    app.get("/phone/brands/:brand", {
        schema: {
            params: ProductSchemas.Params.Brand,
            querystring: CommonSchemas.Queries.Pagination,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { brand } = request.params;
        const { page, limit } = request.query;
        // const pageNumber = parseInt(page, 10);
        // const limitNumber = parseInt(limit, 10);
        const pageNumber = page;
        const limitNumber = limit;
        const skipAmount = (pageNumber - 1) * limitNumber;
        try {
            const phones_by_brand = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("phone-main").find({ brand: brand }).skip(skipAmount).limit(limitNumber).toArray());
            const totalItems = yield ((_b = app.mongo.db) === null || _b === void 0 ? void 0 : _b.collection("phone-main").countDocuments({ brand: brand }));
            const totalPages = totalItems ? Math.ceil(totalItems / limitNumber) : 1;
            reply.send({
                items: phones_by_brand,
                currentPage: pageNumber,
                totalPages,
                totalItems,
            });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Failed to fetch phones by brand" });
        }
    }));
});
export default route;
