import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import CategoryService from "../services/category.service";
import CreateCategoryDto from "../dtos/create-category.dto";
import UpdateCategoryDto from "../dtos/update-category.dto";
import CategoryEntity from "../entities/category.entity";

class CategoryController {
    private service: CategoryService;

    constructor() {
        this.service = new CategoryService();
    }

    public async getAll(
        _req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const data: CategoryEntity[] | null =
                await this.service.getAll();

            if (!data) {
                return res.status(404).json({
                    message: "No Categories Found",
                    data: [],
                });
            }

            return res.status(200).json({
                message: "Categories Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Categoriess  | CategoriesController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const data = await this.service.getById(id);

            if (!data) {
                return res.status(404).json({
                    message: "Category Not Found",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Category Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Category | CategoriesController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async createNew(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const dto: CreateCategoryDto = plainToInstance(
                CreateCategoryDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | CategoryController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            const existsName: CategoryEntity | null =
                await this.service.getByName(dto.name);

            if (existsName) {
                return res.status(400).json({
                    message: "Category Name Already Exists",
                    data: existsName.name,
                });
            }

            const existsEmail: CategoryEntity | null =
                await this.service.getBySlug(dto.slug);

            if (existsEmail) {
                return res.status(400).json({
                    message: "Category Slug Already Exists",
                    data: existsEmail.slug,
                });
            }

            const data: CategoryEntity | null =
                await this.service.createNew(
                    plainToInstance(CategoryEntity, dto)
                );

            if (!data) {
                return res.status(500).json({
                    message: "Error Creating Category",
                    data: null,
                });
            }

            return res.status(201).json({
                message: "Category Created Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Categories  | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async updateById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const toUpdate: CategoryEntity | null =
                await this.service.getById(id);

            if (!toUpdate) {
                return res.status(404).json({
                    message: "Category Not Found",
                    data: null,
                });
            }

            const dto: UpdateCategoryDto = plainToInstance(
                UpdateCategoryDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | CategoryController UpdateById",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }


            const updatedData: UpdateResult | null =
                await this.service.updateById(
                    id,
                    plainToInstance(CategoryEntity, dto)
                );

            if (!updatedData) {
                return res.status(500).json({
                    message: "Error Updating Category",
                    data: null,
                });
            }

            const data: CategoryEntity | null =
                await this.service.getById(id);

            return res.status(200).json({
                message: "Category Updated Successfully",
                data
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Updating Category  | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

        public async deleteById(
            req: Request,
            res: Response
        ): Promise<Response> {
            try {
                const id = parseInt(req.params.id);
    
                const data: CategoryEntity | null =
                    await this.service.getById(id);
    
                if (!data) {
                    return res.status(404).json({
                        message: "Category Not Found",
                        data: null,
                    });
                }
    
                const deleteResult = await this.service.deleteById(id);
    
                if (!deleteResult) {
                    return res.status(500).json({
                        message: "Error Deleting Category",
                        data: null,
                    });
                }
    
                return res.status(200).json({
                    message: "Category Deleted Successfully",
                    data
                });
            } catch (error) {
                return res.status(500).json({
                    message: "Error Delting Category  | CategoryController",
                    data:
                        error instanceof Error
                            ? error.message
                            : String(error),
                });
            }
        }
}

export default CategoryController;
