import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CommonSchemas, ProductSchemas } from "../../schemas/index.ts";
import { Type } from "@fastify/type-provider-typebox";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/laptop",
    {
      schema: {
        querystring: CommonSchemas.Queries.Pagination,
      },
    },
    async (request, reply) => {
      const { page, limit } = request.query;
      const pageNumber = page;
      const limitNumber = limit;
      const skipAmount = (pageNumber - 1) * limitNumber;
      try {
        const laptops = await app.mongo.db
          ?.collection("laptop-main")
          .find({})
          .skip(skipAmount)
          .limit(limitNumber)
          .toArray();

        const totalItems = await app.mongo.db
          ?.collection("laptop-main")
          .countDocuments({});

        const totalPages = totalItems ? Math.ceil(totalItems / limitNumber) : 1;

        reply.send({
          items: laptops,
          currentPage: pageNumber,
          totalPages,
          totalItems,
        });
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
  app.get(
    "/laptop/:productId",
    {
      schema: {
        params: ProductSchemas.Params.ProductId,
      },
    },
    async (request, reply) => {
      const { productId } = request.params;
      try {
        const laptopCollection = await app.mongo.db
          ?.collection("laptop-main")
          .findOne({ product_id: productId });

        if (!laptopCollection) {
          return reply.status(404).send({ error: "Laptop not found" });
        }

        reply.send(laptopCollection);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
  app.get(
    "/laptop/technical",
    {
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
    },
    async (request, reply) => {
      const { productId } = request.query;
      try {
        const laptop_technical = await app.mongo.db
          ?.collection("laptop-main-technical")
          .findOne({ product_id: productId });

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
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
  app.get(
    "/laptop/cover",
    {
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
    },
    async (request, reply) => {
      const { url } = request.query;

      try {
        const laptop_cover = await app.mongo.db
          ?.collection("laptop-main-cover")
          .findOne({ url: url });

        if (!laptop_cover) {
          return reply.status(404).send({ error: "Laptop cover not found" });
        }

        const selectedProps = {
          product_id: laptop_cover.product_id,
          cover_image: laptop_cover.cover_image,
        };

        reply.send(selectedProps);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
};

export default route;
