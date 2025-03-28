import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { ProductSchemas } from "../../schemas/index.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.patch(
    "/addSearchHistory/:userId",
    {
      schema: {
        params: ProductSchemas.Params.UserId,
        body: ProductSchemas.Params.ProductId,
      },
    },
    async (request, reply) => {
      const userId = request.params.userId;
      const productId = request.body.productId;
      try {
        await app.mongo.db
        ?.collection("user")
        .updateOne({user_id: userId}, { $addToSet: { search_history: productId, recommended: productId } }, {upsert: true})
        reply.send({
          success: true,
          message: `"Product ${productId} added to search history of user ${userId}"`,
        });
      } catch (err) {
        console.log(err)
      }
    }
  );
};
export default route;
