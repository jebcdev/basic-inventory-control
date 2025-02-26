import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import ClientService from "../services/client.service";
import ClientEntity from "../entities/client.entity";
import CreateClientDto from "../dtos/create-client.dto";
import UpdateClientDto from "../dtos/update-client.dto";

class ClientController{
    private service: ClientService;

    constructor() {
        this.service = new ClientService();
    }

    public async getAll(
        _req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const data: ClientEntity[] | null =
                await this.service.getAll();

            if (!data) {
                return res.status(404).json({
                    message: "No Clients Found",
                    data: [],
                });
            }

            return res.status(200).json({
                message: "Clients Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Clients  | ClientController",
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
                    message: "Client Not Found",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Client Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Client | ClientController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getByEmail(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const email = parseInt(req.params.email);

            const data = await this.service.getById(email);

            if (!data) {
                return res.status(404).json({
                    message: "Client Not Found",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Client Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Client | ClientController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getByDni(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const dni = parseInt(req.params.dni);

            const data = await this.service.getById(dni);

            if (!data) {
                return res.status(404).json({
                    message: "Client Not Found",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Client Fetched Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Client | ClientController",
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
            const dto: CreateClientDto = plainToInstance(
                CreateClientDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | ClientController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            let exists: ClientEntity | null =
                await this.service.getByDni(dto.dni);

            if (exists) {
                return res.status(400).json({
                    message: "Client DNI Already Exists",
                    data: exists.dni,
                });
            }

             exists =
                await this.service.getByEmail(dto.email);

            if (exists) {
                return res.status(400).json({
                    message: "Client Email Already Exists",
                    data: exists.email,
                });
            }

           
            const data: ClientEntity | null =
                await this.service.createNew(
                    plainToInstance(ClientEntity, dto)
                );

            if (!data) {
                return res.status(500).json({
                    message: "Error Creating Client",
                    data: null,
                });
            }

            return res.status(201).json({
                message: "Client Created Successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Creating Client  | ClientController",
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

            const toUpdate: ClientEntity | null =
                await this.service.getById(id);

            if (!toUpdate) {
                return res.status(404).json({
                    message: "Client Not Found",
                    data: null,
                });
            }

            const dto: UpdateClientDto = plainToInstance(
                UpdateClientDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | ClientController UpdateById",
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
                    plainToInstance(ClientEntity, dto)
                );

            if (!updatedData) {
                return res.status(500).json({
                    message: "Error Updating Client",
                    data: null,
                });
            }

            const data: ClientEntity | null =
                await this.service.getById(id);

            return res.status(200).json({
                message: "Client Updated Successfully",
                data
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Updating Client  | ClientController",
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

            const data: ClientEntity | null =
                await this.service.getById(id);

            if (!data) {
                return res.status(404).json({
                    message: "Client Not Found",
                    data: null,
                });
            }

            const deleteResult = await this.service.deleteById(id);

            if (!deleteResult) {
                return res.status(500).json({
                    message: "Error Deleting Client",
                    data: null,
                });
            }

            return res.status(200).json({
                message: "Client Deleted Successfully",
                data
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Deleting Client  | ClientController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}


export default ClientController;