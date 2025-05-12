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
    app.get("/recommended/:userId", {
        schema: {
            params: ProductSchemas.Params.UserId,
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = request.params.userId;
        try {
            console.log("Fetching recommendations for userId:", userId);
            if (!app.mongo.db) {
                throw new Error("Database connection not established");
            }
            const userProfile = yield app.mongo.db
                .collection("user")
                .findOne({ user_id: userId });
            console.log("User profile found:", userProfile ? "yes" : "no");
            if (!userProfile) {
                console.log("No user profile found, returning random phones");
                const result = yield app.mongo.db
                    .collection("phone-main")
                    .find()
                    .limit(4)
                    .toArray();
                console.log("Random phones found:", result.length);
                return reply.send(result);
            }
            const userRecommended = userProfile.recommended;
            console.log("User recommended products:", userRecommended);
            if (app.mongo.db && userRecommended && userRecommended.length < 4) {
                console.log("Fetching additional random phones");
                const fourNewest = yield app.mongo.db
                    .collection("phone-main")
                    .aggregate([{ $sample: { size: 4 - userRecommended.length } }])
                    .toArray();
                const userRecommendedDocuments = yield app.mongo.db
                    .collection("phone-main")
                    .find({ product_id: { $in: userRecommended } })
                    .toArray();
                console.log("Additional phones found:", fourNewest.length);
                console.log("User recommended phones found:", userRecommendedDocuments.length);
                if (userRecommendedDocuments && fourNewest) {
                    const result = [...userRecommendedDocuments, ...fourNewest];
                    return reply.send(result);
                }
            }
            else {
                console.log("Fetching all recommended phones");
                const result = yield app.mongo.db
                    .collection("phone-main")
                    .find({ product_id: { $in: userRecommended } })
                    .toArray();
                console.log("Recommended phones found:", result.length);
                return reply.send(result);
            }
        }
        catch (err) {
            console.error("Error in recommended endpoint:", err);
            return reply.status(500).send({
                error: "Failed to fetch recommendations",
                details: err instanceof Error ? err.message : "Unknown error"
            });
        }
    }));
    app.get("/recommended/", {
        schema: {},
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!app.mongo.db) {
                throw new Error("Database connection not established");
            }
            console.log("Fetching random phones");
            const result = yield app.mongo.db
                .collection("phone-main")
                .aggregate([{ $sample: { size: 4 } }])
                .toArray();
            console.log("Random phones found:", result.length);
            return reply.send(result);
        }
        catch (error) {
            console.error("Error in recommended endpoint:", error);
            return reply.status(500).send({
                error: "Failed to fetch recommendations",
                details: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }));
});
export default route;
