import { RelativePathString } from "expo-router";

export const baseRoutes = {
    user: '/user' as RelativePathString,
    admin: '/admin' as RelativePathString,

}
export const childRoutes = {
    createPicto: '/admin/create-picto' as RelativePathString,
    createCategory: '/admin/create-category' as RelativePathString
}