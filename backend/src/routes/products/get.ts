import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import db from "../../db/index.ts";
import { ProductSchemas } from "../../schemas/index.ts"
import CommonSchemas from "../../schemas/commons/index.ts";
 const route: FastifyPluginAsyncTypebox = async  (app) => {
  app.get('/:postId', {
    schema: {
      params: ProductSchemas.Params.ProductId,
      response: {
        200: ProductSchemas.Bodies.Products
      }
    }
  } ,async (request, reply) => {
    const productId = request.params.productId;
    const product = db.products.find(product => product.id === productId);
    if (!product) {
      throw app.httpErrors.notFound();
    }
    return product;
  });

  app.get('/', {
    schema: {
      querystring: CommonSchemas.Queries.Pagination,
      response: {
        200: ProductSchemas.Bodies.ProductsPaginated
      }
    }
  }, ({query: {offset, limit}}) => ({
    count: db.products.length,
    data: db.products.slice(offset, offset + limit),
  }));
  app.get('/recommended/:userId', {
    schema: {
      params: ProductSchemas.Params.UserId,
      response: {
        200: ProductSchemas.Bodies.ProductsPaginated
      }
    }
  }, async (request, reply) => {
    const userId = request.params.userId;
    return {
    count: db.products.length,
    data: db.products.slice(0,4)
  }});
}

export default route;