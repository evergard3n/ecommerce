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
        
      },
    },
    async (request, reply) => {
      const { productId } = request.params;
      try {
        const phoneCollection = await app.mongo.db
          ?.collection("phone-2")
          .findOne({ product_id: productId });
        

          reply.send(phoneCollection);
        
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
          ?.collection("phone2_technical")
          .findOne({ product_id: productId });
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
        } else {
          throw new Error(`Product with id ${productId} not found`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
  app.get(
    "/phone/:url/cover",
    {
      schema: {
        params: ProductSchemas.Params.Url,
      },
    },
    async (request, reply) => {
      const { url } = request.params;
      
      try {
        const phone_cover = await app.mongo.db
          ?.collection("phone2_cover")
          .findOne({ url:url });
        if (phone_cover) {
          const selectedProps = {
            product_id: phone_cover.product_id,
            cover_image: phone_cover.cover_image,
          };
          return selectedProps;
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
};

export default route;
