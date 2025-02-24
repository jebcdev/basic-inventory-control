import { DeleteResult, UpdateResult } from "typeorm";

import CategoryEntity from "../entities/category.entity";

interface ICategoryRepository {
    getAll(): Promise<CategoryEntity[] | null>;
    getById(id: number): Promise<CategoryEntity | null>;
    getByName(name: string): Promise<CategoryEntity | null>;
    getBySlug(slug: string): Promise<CategoryEntity | null>;
    createNew(category: CategoryEntity): Promise<CategoryEntity | null>;
    updateById(id: number, category: CategoryEntity): Promise<UpdateResult | null>;
    deleteById(id: number): Promise<DeleteResult | null>;
}

export default ICategoryRepository;
