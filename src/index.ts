import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {CourseResolver} from "./resolvers/course/course.resolver";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {CollectionResolver} from "./resolvers/collection/collection.resolver";
import {UserResolver} from "./resolvers/user/user.resolver";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [
            CourseResolver,
            CollectionResolver,
            UserResolver
        ]
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT as unknown as number ||  4000 }
    });
    console.log(`GraphQL server ready at ${url}`);
}

bootstrap();