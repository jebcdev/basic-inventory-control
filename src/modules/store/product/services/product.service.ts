import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import ProductEntity from "../entities/product.entity";
import IProductRepository from "../repositories/product.repository";

/* Refactorizar las relaciones en un array */

class ProductService implements IProductRepository {
    private repository: Repository<ProductEntity>;
private relations: string[] = ["category", "saleDetails"];
    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                ProductEntity
            );
            this.relations= ["category", "saleDetails"];
    }

    public async getAll(): Promise<ProductEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            relations:this.relations ,
        });
    }

    public async getById(id: number): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            relations:this.relations ,
        });
    }

    public async getByCode(
        code: string
    ): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                code: code,
            },
            relations:this.relations ,
        });
    }

    public async getByName(
        name: string
    ): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name,
            },
            relations:this.relations ,
        });
    }

    public async getBySlug(
        slug: string
    ): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                slug: slug,
            },
            relations:this.relations ,
        });
    }

    public async createNew(
        data: ProductEntity
    ): Promise<ProductEntity | null> {
        return await this.repository.save(data);
    }

    
    public async updateById(
        id: number,
        data: ProductEntity
    ): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    public async deleteById(
        id: number
    ): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}

export default ProductService;
