import { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (app) => {
    app.get("/collections", async (request, reply) => {
        const collections = await app.mongo.db?.listCollections().toArray();
    return { collections };
    })
}

export default route