export const createVwCoursesByCollection = `CREATE VIEW \`vw_courses_by_collection\` as
SELECT
\`collectionId\`,
\`name\`,
\`courseId\`,
\`courses\`.\`title\`,
\`courses\`.\`description\`,
\`courses\`.\`duration\`,
\`courses\`.\`outcome\`
 FROM \`collections\`
 LEFT JOIN \`collection_to_course_index\` ON \`collections\`.\`id\` = \`collection_to_course_index\`.\`collectionId\`
 LEFT JOIN \`courses\` ON \`courseId\` = \`courses\`.\`id\`
 WHERE \`courses\`.\`active\` = true
 ORDER BY \`collectionId\` ASC;`;