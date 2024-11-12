# Courses API

An API to handle information about courses.

## Demo
The `Courses-Api.json` file in this repo is a Postman collection set up to 
make requests to the deployed version of this app.

## What I would have done with more time
### Finish authentication
I set up the user resolver, but did not have time to implement the 
authorisation check. I needed to finish my implementation of context and 
pass it to the resolvers.

### Add db access to context
Currently, the database is accessed independently of context, which means we 
can't cache requests. It also makes it more difficult to manage the database 
in tests.

### Finish tests
I ran out of time writing the tests, but ideally I would have both happy and 
sad path tests for each request.

### Improve error responses
Right now we basically return the default errors to the user, but these 
should be altered so that users don't get as much visibility into our code.

### Create a script to auto-build the db and load default data
I've created the SQL files I would run in order to build the db, but I 
didn't have time to write a script to run them.

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

### Users
#### Register
```
mutation Register($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    username
  }
}
```

| parameter | type   | description                                                                           | required           |
|-----------|--------|---------------------------------------------------------------------------------------|--------------------|
| username  | string | The username to register with. The request will fail if the username exists in the db | :heavy_check_mark: |
| password  | string | The password to set.                                                                  | :heavy_check_mark: |

#### Login
```
query Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
  }
}
```


| parameter | type   | description                                                                      | required           |
|-----------|--------|----------------------------------------------------------------------------------|--------------------|
| username  | string | The username to log in with.                                                     | :heavy_check_mark: |
| password  | string | The password to log in with. The request will fail if the password is incorrect. | :heavy_check_mark: |
