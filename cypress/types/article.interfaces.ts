import { author } from "../types/author.interface"

export interface Article  {
    title: string,
    description: string,
    body: string,
    tagList: string[]
}

export interface ArticleResponse extends Article {
    slug: string,
    createdAt: Date,
    updatedAt: Date,
    favorited: false,
    favoritesCount: number,
    author: author
}