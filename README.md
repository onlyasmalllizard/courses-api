# Courses API

An API to handle information about courses.

## Resolvers
### Courses
#### getCourses
```
query getCourses($limit: Int, $offset: Int, $sortOrder: String) {
  getCourses(limit: $limit, offset: $offset, sortOrder: $sortOrder) {
    id
    title
    description
    duration
    outcome
  }
}
```

| parameter   | type            | description                                                                | required |
|-------------|-----------------|----------------------------------------------------------------------------|----------|
 | `limit`     | number          | Limits the number of results returned.                                     | :x:      |
 | `offset`    | number          | Changes the starting point of the results. Only valid when `limit` is set. | :x:      |
 | `sortOrder` | `ASC` or `DESC` | When set, orders the results by title in the given order.                  | :x:      |

#### getCourseById
```
query getCourseById($courseId: Int!) {
  getCourseById(courseId: $courseId) {
    id
    title
    description
    duration
    outcome
  }
}
```

| parameter | type   | description                      | required           |
|-----------|--------|----------------------------------|--------------------|
| courseId  | number | The id of the course to retrieve | :heavy_check_mark: |

#### addCourse
```
mutation addCourse($course: AddCourseRequest!, $collectionId: Int!) {
  addCourse(course: $course, collectionId: $collectionId) {
    id
    title
    description
    duration
    outcome
  }
}
```

| parameter    | type                                                                                                                    | description                                        | required           |
|--------------|-------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|--------------------|
| course       | {<br/>&emsp;title: string;<br/>&emsp;description: string;<br/>&emsp;duration: string;<br />&emsp;outcome: string;<br/>} | The information about the course info to add       | :heavy_check_mark: |
| collectionId | number                                                      <br/>                                                       | The id of the collection the new course belongs to | :heavy_check_mark: |

#### updateCourse
```
mutation Mutation($course: UpdateCourseRequest!) {
  updateCourse(course: $course) {
    id
    title
    description
    duration
    outcome
  }
}
```
| parameter           | type                                                                                                                                             | description                                                                               | required           |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|--------------------|
| updateCourseRequest | {<br/>&emsp;id: number;</br>&emsp;title?: string;<br/>&emsp;description?: string;<br/>&emsp;duration?: string;<br/>&emsp;outcome?: string;<br/>} | The details of the course to update. Any fields that are not present will not be updated. | :heavy_check_mark: |

#### deleteCourse
```
mutation deleteCourse($courseId: Int!) {
  deleteCourse(courseId: $courseId) {
    id
  }
}
```

| parameter | type   | description                    | required           |
|-----------|--------|--------------------------------|--------------------|
| courseId  | number | The id of the course to delete | :heavy_check_mark: |

### Collections
#### getCollections
```
query getCollections {
  getCollections {
    collections {
      id
      name
    }
  }
}
```

#### getCollectionById
Returns the collection information along with all courses that belong to 
that collection.

```
query getCollectionById($collectionId: Int!) {
  getCollectionById(collectionId: $collectionId) {
    collection {
      id
      name
    }
    courses {
      id
      title
      description
      duration
      outcome
    }
  }
}
```

| parameter    | type   | description                          | required           |
|--------------|--------|--------------------------------------|--------------------|
| collectionId | number | The id of the collection to retrieve | :heavy_check_mark: |