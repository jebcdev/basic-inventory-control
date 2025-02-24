import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import ProductEntity from "../../product/entities/product.entity";
import SaleEntity from "../../sale/entities/sale.entity";
export enum StatusEnum {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

@Entity("sale_details")
class SaleDetailEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    sale_id: number;

    @Column({ nullable: false })
    product_id: number;

    @Column({ nullable: false })
    quantity: number;

    @Column({ nullable: false, type: "double" })
    unit_price: number;

    @Column({ nullable: false, type: "double", default: 0 })
    sub_total: number;

    @Column({ nullable: false, type: "enum", enum: StatusEnum })
    status: StatusEnum;

    @ManyToOne(() => SaleEntity, (sale) => sale.saleDetails)
    @JoinColumn({ name: "sale_id" })
    sale: SaleEntity;

    @ManyToOne(() => ProductEntity, (product) => product.saleDetails)
    @JoinColumn({ name: "product_id" })
    product: ProductEntity;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleted_at: Date;
}
export default SaleDetailEntity;
