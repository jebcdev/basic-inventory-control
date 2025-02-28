import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import ProductService from "../services/product.service";
import ProductEntity from "../entities/product.entity";
import CreateProductDto from "../dtos/create-product.dto";
import UpdateProductDto from "../dtos/update-product.dto";

class ProductController {
    private service: ProductService;

    constructor() {
        this.service = new ProductService();
    }

    public async getAll(
        _req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const data: ProductEntity[] | null =
                await this.service.getAll();

            if (!data) {
                return res.status(404).json({
                    message: "No Products Found",
                    data: [],
                });
            }

            return res.status(200).json({
                message: "Products Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Products  | ProductController",
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
                    message: "Product Not Found",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Product Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Product | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getByCode(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const code = req.params.code;

            const data = await this.service.getByCode(code);

            if (!data) {
                return res.status(404).json({
                    message: "Product Not Found",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Product Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Product | ProductController",
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
            const dto: CreateProductDto = plainToInstance(
                CreateProductDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | ProductController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            let exists: ProductEntity | null =
                await this.service.getByCode(dto.code);

            /* Code */
            if (exists) {
                return res.status(400).json({
                    message: "Product Code Already Exists",
                    data: exists.code,
                });
            }

            exists = await this.service.getByName(dto.name);

            /* Name */
            if (exists) {
                return res.status(400).json({
                    message: "Product Name Already Exists",
                    data: exists.name,
                });
            }

            exists = await this.service.getBySlug(dto.slug);

            /* Slug */
            if (exists) {
                return res.status(400).json({
                    message: "Product Slug Already Exists",
                    data: exists.slug,
                });
            }

            const data: ProductEntity | null =
                await this.service.createNew(
                    plainToInstance(ProductEntity, dto)
                );

            if (!data) {
                return res.status(500).json({
                    message: "Error Creating Product",
                    data: null,
                });
            }

            return res.status(201).json({
                message: "Product Created Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Creating Product  | ProductController",
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

            const toUpdate: ProductEntity | null =
                await this.service.getById(id);

            if (!toUpdate) {
                return res.status(404).json({
                    message: "Product Not Found",
                    data: null,
                });
            }

            const dto: UpdateProductDto = plainToInstance(
                UpdateProductDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | ProductController UpdateById",
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
                    plainToInstance(ProductEntity, dto)
                );

            if (!updatedData) {
                return res.status(500).json({
                    message: "Error Updating Product",
                    data: null,
                });
            }

            const data: ProductEntity | null =
                await this.service.getById(id);

            return res.status(200).json({
                message: "Product Updated Successfully",
                data
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Updating Product  | ProductController",
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

            const data: ProductEntity | null =
                await this.service.getById(id);

            if (!data) {
                return res.status(404).json({
                    message: "Product Not Found",
                    data: null,
                });
            }

            const deleteResult = await this.service.deleteById(id);

            if (!deleteResult) {
                return res.status(500).json({
                    message: "Error Deleting Product",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Product Deleted Successfully",
                data
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Deleting Product  | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}

export default ProductController;
