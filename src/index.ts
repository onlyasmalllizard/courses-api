import "reflect-metadata";
import {buildSchemaSync} from "type-graphql";
import {CourseResolver} from "./resolvers/course/course.resolver";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {CollectionResolver} from "./resolvers/collection/collection.resolver";
import {UserResolver} from "./resolvers/user/user.resolver";
import depthLimit from "graphql-depth-limit";
import {ApolloServerErrorCode} from "@apollo/server/errors";
import {ApolloServerPluginCacheControl} from "@apollo/server/plugin/cacheControl";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache"
import {logger} from "./lib/logger";
import {Context} from "./apollo/context";
import {OSCContext} from "./apollo/types";

function getApolloServer() {
    const schema = buildSchemaSync({
        resolvers: [
            CourseResolver,
            CollectionResolver,
            UserResolver
        ]
    });
    const CONST_DEPTH_LIMIT = 5;

    return new ApolloServer<OSCContext>({
        schema,
        validationRules: [depthLimit(CONST_DEPTH_LIMIT)],
        formatError: (formattedError) => {
            if (formattedError.extensions?.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
                return {
                    ...formattedError,
                    message: "Your query doesn't match the schema. Try double checking it!"
                }
            }

            return formattedError;
        },
        plugins: [
            ApolloServerPluginCacheControl({
                defaultMaxAge: 600
            })
        ],
        cache: new InMemoryLRUCache(),
        status400ForVariableCoercionErrors: true
    });
}

const context = new Context();
const server = getApolloServer();
const { cache } = server;

async function startApolloServer() {
    logger.info('Starting Apollo server...');

    const { url } = await startStandaloneServer(server, {
        context: async ({req, res}) => {
            const token =  req.headers.authorization ?? req.headers.Authorization as string;
            return context.getContext({token, cache})
        }
    });

    logger.info(`Server is running! Query at ${url}`);
}

startApolloServer();