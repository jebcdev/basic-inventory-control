import{
    Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,
    DeleteDateColumn,BaseEntity,
    ManyToOne,
    JoinColumn,
    Double,
    OneToMany,
} from "typeorm"
import ClientEntity from "../../client/entities/client.entity";
import { UserEntity } from "../../../user/entities/user.entity";
import ProductEntity from "../../product/entities/product.entity";
import SaleDetailEntity from "../../sale-details/entities/sale-details.entity";
export enum StatusEnum{
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
}

@Entity("sales")
class SaleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_id: number;

    @Column({ nullable: false })
    client_id: number;

    @Column({ nullable: false, unique: true })
    number: number;

    @Column({ nullable: false, type: "double" })
    total_amount: number;

    @Column({ nullable: false, type: "double", default: 0 })
    discount: number;

    @Column({ nullable: false, type: "double", default: 0 })
    tax: number;

    @Column({ nullable: false, type: "enum", enum: StatusEnum })
    status: StatusEnum;

    @ManyToOne(() => UserEntity, (user) => user.sales)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(() => ClientEntity, (client) => client.sales)
    @JoinColumn({ name: "client_id" })
    client: ClientEntity;

    @OneToMany(() => SaleDetailEntity, (saleDetail) => saleDetail.sale)
    saleDetails: SaleDetailEntity[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleted_at: Date;
}

export default SaleEntity;