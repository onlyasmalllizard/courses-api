import {describe, test, expect} from "vitest";
import {getApolloServer} from "src";
import {checkResponseBody} from "test/check-test-responses";
import {Collection, GetCollectionByIdResponse} from "src/resolvers/collection/types";
import * as collectionsResponse from "test/_data/responses/collectionsResponse"

const testServer = getApolloServer();

const COLLECTIONS_QUERY = `query GetCollections {
  getCollections {
    collections {
      id
      name
    }
  }
}`;

const COLLECTION_BY_ID_QUERY = `query GetCollectionById($collectionId: Int!) {
  getCollectionById(collectionId: $collectionId) {
    collection {
      id
      name
    }
    courses {
      id
      title
      description
      outcome
      duration
    }
  }
}`;

describe("GetCollections", () => {
    test("it returns all collections", async () => {
        const response = await testServer.executeOperation({
            query: COLLECTIONS_QUERY
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCollections as Collection[];
        expect(typedResponse).toEqual(collectionsResponse.getCollections);
    });
});

describe("GetCollectionById", () => {
    test("it returns the collection and associated courses for the given id", async () => {
        const response = await testServer.executeOperation({
            query: COLLECTION_BY_ID_QUERY,
            variables: {
                collectionId: 3
            }
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCollectionById as GetCollectionByIdResponse[];
        expect(typedResponse).toEqual(collectionsResponse.getCollectionById);
    });
});