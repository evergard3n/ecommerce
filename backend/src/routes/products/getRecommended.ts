import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ProductSchemas } from "../../schemas/index.ts";
import { ObjectId } from "@fastify/mongodb";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/recommended/:userId",
    {
      schema: {
        params: ProductSchemas.Params.UserId,
        // response: { 200: ProductSchemas.Bodies.ProductsPaginated },
      },
    },
    async (request, reply) => {
      const userId = request.params.userId;
      try {
        const userProfile = await app.mongo.db
          ?.collection("user")
          .findOne({ user_id: userId });
        if (!userProfile) {
          const result = await app.mongo.db
            ?.collection("phone-2")
            .find()
            .limit(4)
            .toArray();
          reply.send(result);
        } else {
          const userRecommended = userProfile.recommended;
          if (app.mongo.db && userRecommended && userRecommended.length < 4) {
            const fourNewest = await app.mongo.db
              ?.collection("phone-2")
              .aggregate([{ $sample: { size: 4 - userRecommended.length } }])
              .toArray();
            const userRecommendedDocuments = await app.mongo.db
              ?.collection("phone-2")
              .find({ product_id: { $in: userRecommended } })
              .toArray();
            if (userRecommendedDocuments && fourNewest) {
              const result = [...userRecommendedDocuments, ...fourNewest];
              reply.send(result);
            }
          } else {
            const result = await app.mongo.db
              ?.collection("phone-2")
              .find({ product_id: { $in: userRecommended } })
              .toArray();
            reply.send(result);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  );
  app.get(
    "/recommended/",
    {
      schema: {
        // response: { 200: ProductSchemas.Bodies.ProductsPaginated },
      },
    },
    async (request, reply) => {
      try {
        const result = await app.mongo.db
          ?.collection("phone-2")
          .aggregate([{ $sample: { size: 4 } }])
          .toArray();
        reply.send(result);
      } catch (error) {
        console.log(error);
      }
    }
  );
};
export default route;
