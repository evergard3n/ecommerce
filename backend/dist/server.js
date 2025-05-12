var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import autoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default function (app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.register(import('@fastify/sensible'));
        app.register(autoLoad, {
            dir: join(__dirname, 'routes'),
            options: { prefix: '/api' },
            forceESM: true,
        });
        app.register(cors, {
            origin: ['http://localhost:3001'], // allow requests from this origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow these methods
            allowedHeaders: ['Content-Type', 'Authorization'], // allow these headers
        });
        app.ready(() => {
            app.log.info(app.printRoutes());
        });
    });
}
