import {GetCollectionByIdResponse, vwCoursesByCollectionItem} from "../types";

export function mapDataToGraphql(data: vwCoursesByCollectionItem[]): GetCollectionByIdResponse {
    return {
        collection: {
            id: data[0].collectionId,
            name: data[0].name
        },
        courses: data.map(item => ({
            id: item.courseId,
            title: item.title,
            description: item.description,
            duration: item.duration,
            outcome: item.outcome
        }))
    };
}