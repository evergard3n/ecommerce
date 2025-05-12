import Fastify from "fastify";
import fastifyMongo from '@fastify/mongodb';
const fastify = Fastify({ logger: true });
fastify.register(fastifyMongo, {
    forceClose: true,
    url: "mongodb+srv://ngvh1110:1234@cluster0.ff8rq.mongodb.net/HoangHaMobile"
});
