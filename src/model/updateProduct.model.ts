import { CreateProduct } from "./createProduct.model";

export interface UpdateProduct extends CreateProduct{
    id: number;
}