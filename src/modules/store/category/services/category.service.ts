import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ICategoryRepository from "../repositories/icategory.repository";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import CategoryEntity from "../entities/category.entity";

class CategoryService implements ICategoryRepository {
    private repository: Repository<CategoryEntity>;

    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                CategoryEntity
            );
    }

    public async getAll(): Promise<CategoryEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            relations: ["products"], // Incluye la relación con la entidad RoleEntity.
        });
    }

    public async getById(id: number): Promise<CategoryEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            relations: ["products"], // Incluye la relación con la entidad RoleEntity.
        });
    }

    public async getByName(
        name: string
    ): Promise<CategoryEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name, // Se puede simplificar a `name`
            },
        });
    }

    public async getBySlug(
        slug: string
    ): Promise<CategoryEntity | null> {
        return await this.repository.findOne({
            where: {
                slug: slug, // Se puede simplificar a `name`
            },
        });
    }

    public async createNew(
        data: CategoryEntity
    ): Promise<CategoryEntity | null> {
        return await this.repository.save(data);
    }

    public async updateById(
        id: number,
        data: CategoryEntity
    ): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    public async deleteById(
        id: number
    ): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}

export default CategoryService;
