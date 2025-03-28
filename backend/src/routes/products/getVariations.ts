import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ProductSchemas } from "../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
    app.get('/variations/:productId', {
        schema: {
            params: ProductSchemas.Params.ProductId,
        }
    }, async (request,reply) => {
        const productId = request.params.productId;
        try {
            const targetDevice = await app.mongo.db
            ?.collection("phone")
            .findOne({product_id: productId});
            const variations = await app.mongo.db?.collection("phone").find({name: targetDevice?.name}).toArray();
            
            reply.send(variations);
            
        } catch (err) {
            console.log(err)
        }
    })
}
export default route