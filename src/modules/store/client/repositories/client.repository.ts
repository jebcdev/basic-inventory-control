import { DeleteResult, UpdateResult } from "typeorm";
import ClientEntity from "../entities/client.entity";



interface IClientRepository {
    getAll(): Promise<ClientEntity[] | null>;
    getById(id: number): Promise<ClientEntity | null>;
    getByDni(dni: string): Promise<ClientEntity | null>;
    // getByName(name: string): Promise<ClientEntity | null>;
    getByEmail(email: string): Promise<ClientEntity | null>;
    createNew(client: ClientEntity): Promise<ClientEntity | null>;
    updateById(id: number, client: ClientEntity): Promise<UpdateResult | null>;
    deleteById(id: number): Promise<DeleteResult | null>;
}

export default IClientRepository;
