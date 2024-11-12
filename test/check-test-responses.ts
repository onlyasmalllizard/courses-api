import {GraphQLResponse} from "@apollo/server";

export function checkResponseBody(
    response: GraphQLResponse<Record<string, unknown>>
) {
    if (response) {
        if (response.body.kind === "single") {
            const data = response.body.singleResult.data;

            if (!data) {
                throw new Error("body data is undefined");
            }

            return data;
        }
    } else {
        throw new Error("test response is undefined");
    }
}