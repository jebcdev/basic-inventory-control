import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import ProductEntity from "../../product/entities/product.entity";

@Entity("categories")
class CategoryEntity extends BaseEntity {
    // Identificador único del usuario (clave primaria autoincremental).
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 200, // Limita la longitud máxima a 200 caracteres.
        nullable: false, // No permite valores nulos.
        unique: true, // Asegura que el correo electrónico sea único en la tabla.
    })
    name: string;

    @Column({
        length: 250, // Limita la longitud máxima a 200 caracteres.
        nullable: false, // No permite valores nulos.
        unique: true, // Asegura que el correo electrónico sea único en la tabla.
    })
    slug: string;

    @Column({
        type: "text", // Almacena texto largo.
        nullable: false, // No permite valores nulos.
    })
    description: string;

    /* Definir Relaciones */
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];

    // Columna que almacena automáticamente la fecha y hora de creación del registro.
    @CreateDateColumn({
        type: "timestamp", // Guarda la fecha como timestamp en la base de datos.
        nullable: false, // No permite valores nulos.
    })
    created_at: Date;

    // Columna que almacena automáticamente la fecha y hora de la última actualización del registro.
    @UpdateDateColumn({
        type: "timestamp", // Guarda la fecha como timestamp.
        nullable: false, // No permite valores nulos.
    })
    updated_at: Date;

    // Columna para la eliminación lógica (soft delete), almacena la fecha de eliminación si el registro es borrado.
    @DeleteDateColumn({
        type: "timestamp", // Guarda la fecha de eliminación lógica.
        nullable: true, // Permite valores nulos porque el registro puede no haber sido eliminado.
    })
    deleted_at: Date;
}

export default CategoryEntity;
