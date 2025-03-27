import fastify from "fastify";
import buildServer from "./server.ts"
import fastifyMongo from '@fastify/mongodb'
import dotenv from "dotenv"

dotenv.config()

async function run() {
    const app = fastify({
        logger: {
            transport : {
                target: 'pino-pretty',
            }
        }
    });
    app.register(buildServer)
    app.register(fastifyMongo, {
        forceClose: true,
        url: process.env.MONGODB_CONNECTION_URL
    })
    
    try {
        await app.listen({
            port: 3000,
            host: "0.0.0.0"
        });
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
run()