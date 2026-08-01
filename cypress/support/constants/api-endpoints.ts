export const APIEndpoints = {
    LOGIN: "/api/users/login",
    ARTICLES: "/api/articles?limit=10&offset=0",
    POST_ARTICLES: "/api/articles/",
    TAGS:"/api/tags"
} as const;