var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CommonSchemas, ProductSchemas } from "../../schemas/index.ts";
import { Type } from "@fastify/type-provider-typebox";
const route = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get("/laptop", {
        schema: {
            querystring: CommonSchemas.Queries.Pagination,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { page, limit } = request.query;
        const pageNumber = page;
        const limitNumber = limit;
        const skipAmount = (pageNumber - 1) * limitNumber;
        try {
            const laptops = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("laptop-main").find({}).skip(skipAmount).limit(limitNumber).toArray());
            const totalItems = yield ((_b = app.mongo.db) === null || _b === void 0 ? void 0 : _b.collection("laptop-main").countDocuments({}));
            const totalPages = totalItems ? Math.ceil(totalItems / limitNumber) : 1;
            reply.send({
                items: laptops,
                currentPage: pageNumber,
                totalPages,
                totalItems,
            });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Internal server error" });
        }
    }));
    app.get("/laptop/:productId", {
        schema: {
            params: ProductSchemas.Params.ProductId,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { productId } = request.params;
        try {
            const laptopCollection = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("laptop-main").findOne({ product_id: productId }));
            if (!laptopCollection) {
                return reply.status(404).send({ error: "Laptop not found" });
            }
            reply.send(laptopCollection);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Internal server error" });
        }
    }));
    app.get("/laptop/technical", {
        schema: {
            querystring: ProductSchemas.Params.ProductId,
            response: {
                200: ProductSchemas.Bodies.LaptopTechnicalDetails,
                404: Type.Object({
                    error: Type.String(),
                }),
                500: Type.Object({
                    error: Type.String(),
                }),
            },
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { productId } = request.query;
        try {
            const laptop_technical = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("laptop-main-technical").findOne({ product_id: productId }));
            if (!laptop_technical) {
                return reply.status(404).send({ error: "Laptop technical details not found" });
            }
            const selectedProps = {
                product_id: laptop_technical.product_id,
                screen: laptop_technical.screen,
                cpu: laptop_technical.cpu,
                ram: laptop_technical.ram,
                battery: laptop_technical.battery,
                image: laptop_technical.image,
                more: laptop_technical.more,
            };
            reply.send(selectedProps);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Internal server error" });
        }
    }));
    app.get("/laptop/cover", {
        schema: {
            querystring: ProductSchemas.Params.Url,
            response: {
                200: Type.Object({
                    product_id: Type.String(),
                    cover_image: Type.String(),
                }),
                404: Type.Object({
                    error: Type.String(),
                }),
                500: Type.Object({
                    error: Type.String(),
                }),
            },
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { url } = request.query;
        try {
            const laptop_cover = yield ((_a = app.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("laptop-main-cover").findOne({ url: url }));
            if (!laptop_cover) {
                return reply.status(404).send({ error: "Laptop cover not found" });
            }
            const selectedProps = {
                product_id: laptop_cover.product_id,
                cover_image: laptop_cover.cover_image,
            };
            reply.send(selectedProps);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Internal server error" });
        }
    }));
});
export default route;
