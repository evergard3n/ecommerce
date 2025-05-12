import { ProductSchemas, CommonSchemas } from "../../schemas/index.ts";

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

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
          ?.collection("phone-main")
          .findOne({ product_id: productId });

        reply.send(phoneCollection);
      } catch (error) {
        console.error(error);
      }
    }
  );
  app.get(
    "/phone/technical",
    {
      schema: {
        querystring: ProductSchemas.Params.ProductId,
        response: {
          200: ProductSchemas.Bodies.PhoneTechnicalDetails,
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.query;
      try {
        const phone_technical = await app.mongo.db
          ?.collection("phone-main-technical")
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
    "/phone/cover",
    {
      schema: {
        querystring: ProductSchemas.Params.Url,
      },
    },
    async (request, reply) => {
      const { url } = request.query;

      try {
        const phone_cover = await app.mongo.db
          ?.collection("phone-main-cover")
          .findOne({ url: url });
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
  app.get(
    "/phone/brands/:brand",
    {
      schema: {
        params: ProductSchemas.Params.Brand,
        querystring: CommonSchemas.Queries.Pagination,
      },
    },
    async (request, reply) => {
      const { brand } = request.params;
      const { page, limit } = request.query;
      // const pageNumber = parseInt(page, 10);
      // const limitNumber = parseInt(limit, 10);
      const pageNumber = page;
      const limitNumber = limit;
      const skipAmount = (pageNumber - 1) * limitNumber;

      try {
        const phones_by_brand = await app.mongo.db
          ?.collection("phone-main")
          .find({ brand: brand })
          .skip(skipAmount)
          .limit(limitNumber)
          .toArray();

        const totalItems = await app.mongo.db
          ?.collection("phone-main")
          .countDocuments({ brand: brand });

        const totalPages = totalItems ? Math.ceil(totalItems / limitNumber) : 1;

        reply.send({
          items: phones_by_brand,
          currentPage: pageNumber,
          totalPages,
          totalItems,
        });
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to fetch phones by brand" });
      }
    }
  );
};

export default route;
