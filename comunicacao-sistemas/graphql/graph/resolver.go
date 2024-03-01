package graph

import "github.com/tapiarafael/graphql/internal/database"

type Resolver struct{
	CategoryDB *database.Category
	CourseDB *database.Course
}
