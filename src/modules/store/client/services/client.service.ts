import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import ClientEntity from "../entities/client.entity";
import IClientRepository from "../repositories/client.repository";

class ClientService implements IClientRepository {
    private repository: Repository<ClientEntity>;

    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                ClientEntity
            );
    }

    public async getAll(): Promise<ClientEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            relations: ["sales"],
        });
    }

    public async getById(id: number): Promise<ClientEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            relations: ["sales"],
        });
    }

    /*     public async getByName(
        name: string
    ): Promise<ClientEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name, 
            },
        });
    } */

    public async getByDni(dni: string): Promise<ClientEntity | null> {
        return await this.repository.findOne({
            where: {
                dni: dni,
            },
        });
    }

    public async getByEmail(
        email: string
    ): Promise<ClientEntity | null> {
        return await this.repository.findOne({
            where: {
                email: email,
            },
        });
    }

    public async createNew(
        data: ClientEntity
    ): Promise<ClientEntity | null> {
        return await this.repository.save(data);
    }

    public async updateById(
        id: number,
        data: ClientEntity
    ): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    public async deleteById(
        id: number
    ): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}

export default ClientService;
