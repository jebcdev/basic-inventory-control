import { DeleteResult, UpdateResult } from "typeorm";
import ProductEntity from "../entities/product.entity";


interface IProductRepository {
    getAll(): Promise<ProductEntity[] | null>;
    getById(id: number): Promise<ProductEntity | null>;

    getByCode(code: string): Promise<ProductEntity | null>;
    getByName(name: string): Promise<ProductEntity | null>;
    getBySlug(slug: string): Promise<ProductEntity | null>;

    createNew(client: ProductEntity): Promise<ProductEntity | null>;
    updateById(id: number, client: ProductEntity): Promise<UpdateResult | null>;
    deleteById(id: number): Promise<DeleteResult | null>;
}

export default IProductRepository;