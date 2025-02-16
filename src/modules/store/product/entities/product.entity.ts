import{
    Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,
    DeleteDateColumn,BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm"
import CategoryEntity from "../../category/entities/category.entity";
import SaleEntity from "../../sale/entities/sale.entity";
import SaleDetailEntity from "../../sale-details/entities/sale-details.entity";

@Entity("products")
class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    category_id: number;

    @Column({ length: 200, nullable: false, unique: true })
    code: string;

    @Column({ length: 200, nullable: false, unique: true })
    name: string;

    @Column({ length: 250, nullable: false, unique: true })
    slug: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ length: 250, nullable: false })
    image: string;

    @Column({ nullable: false, default: 1 })
    quantity: number;

    @Column({ nullable: false, type: "double", default: 0 })
    price: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category: CategoryEntity;

    @OneToMany(() => SaleDetailEntity, (saleDetail) => saleDetail.product)
    saleDetails: SaleDetailEntity[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleted_at: Date;
}

export default ProductEntity;