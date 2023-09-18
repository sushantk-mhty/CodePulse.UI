import { ICategory } from "../../category/models/icategory.model";

export interface IBlogPost {
    id:string;
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories:ICategory[]
}

