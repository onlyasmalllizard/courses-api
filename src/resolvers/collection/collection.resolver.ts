import {Arg, Int, Query, Resolver} from "type-graphql";
import {getCollectionsService} from "./get-collections-service/get-collections-service";
import {GetCollectionByIdResponse, GetCollectionsResponse} from "./types";
import {getCollectionByIdService} from "./get-collection-by-id-service/get-collection-by-id-service";

@Resolver()
export class CollectionResolver {
    @Query(() => GetCollectionsResponse)
    async getCollections(): Promise<GetCollectionsResponse> {
        return getCollectionsService();
    }

    @Query(() => GetCollectionByIdResponse)
    async getCollectionById(@Arg('collectionId', () => Int) collectionId: number) {
        return getCollectionByIdService(collectionId);
    }
}