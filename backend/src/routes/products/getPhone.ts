import { FastifyPluginAsync } from "fastify";
import { ProductSchemas } from "../../schemas/index.ts";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ObjectId } from "@fastify/mongodb";
import { Product } from "../../db/decapreted.ts";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/phone/:productId",
    {
      schema: {
        params: ProductSchemas.Params.ProductId,
        response: {
          200: ProductSchemas.Bodies.Products,
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.params;
      try {
        const phoneCollection = await app.mongo.db
          ?.collection("phone")
          .findOne({ product_id: productId });
        if (phoneCollection) {
          const selectedProps: Product = {
            id: productId,
            name: phoneCollection.name,
            image: phoneCollection.image,
            price: phoneCollection.price,
            brand: phoneCollection.brand,
            description: phoneCollection.description,
            storage: phoneCollection.storage,
          };

          reply.send(selectedProps);
        } else {
          throw new Error(`Product with id ${productId} not found`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
  app.get(
    "/phone/:productId/technical",
    {
      schema: {
        params: ProductSchemas.Params.ProductId,
        response: {
          200: ProductSchemas.Bodies.PhoneTechnicalDetails,
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.params;
      try {
        const phone_technical = await app.mongo.db
          ?.collection("phone_technical")
          .findOne({ product_id: productId });
        if (phone_technical) {
          const selectedProps = {
            product_id: phone_technical.product_id,
            screen: phone_technical.screen,
            camera_front: phone_technical.camera_front,
            camera_back: phone_technical.camera_back,
            cpu: phone_technical.cpu,
            battery: phone_technical.battery
          };

          reply.send(selectedProps);
        } else {
          throw new Error(`Product with id ${productId} not found`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
};

export default route;
