import{
    Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,
    DeleteDateColumn,BaseEntity,
    OneToMany,
} from "typeorm"
import SaleEntity from "../../sale/entities/sale.entity";

@Entity("clients")
 class ClientEntity extends BaseEntity{
   
    // Identificador único del usuario (clave primaria autoincremental).
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 200,       // Limita la longitud máxima a 200 caracteres.
        nullable: false,   // No permite valores nulos.
        unique: true,      // Asegura que el correo electrónico sea único en la tabla.
    })
    dni: string;

    @Column({
        length: 200,       // Limita la longitud máxima a 200 caracteres.
        nullable: false,   // No permite valores nulos.
    })
    name: string;

    @Column({
        length: 200,       // Limita la longitud máxima a 200 caracteres.
        nullable: false,   // No permite valores nulos.
    })
    surname: string;

    // Columna para almacenar el correo electrónico del usuario, debe ser único.
    @Column({
        length: 100,       // Limita la longitud máxima a 100 caracteres.
        nullable: false,   // No permite valores nulos.
        unique: true,      // Asegura que el correo electrónico sea único en la tabla.
    })
    email: string;

    @Column({
        length: 200,       // Limita la longitud máxima a 200 caracteres.
        nullable: false,   // No permite valores nulos.
        unique: true,
    })
    phone: string;


    @Column({
        type: "text",      // Almacena texto largo.
        nullable: false,   // No permite valores nulos.
    })
    description: string;

    /* Relaciones */
    @OneToMany(() => SaleEntity, (sale) => sale.user)
    sales: SaleEntity[];

    /* Relaciones */
    
    // Columna que almacena automáticamente la fecha y hora de la última actualización del registro.
    @UpdateDateColumn({
        type: "timestamp", // Guarda la fecha como timestamp.
        nullable: false,   // No permite valores nulos.
    })
    updated_at: Date;

    // Columna para la eliminación lógica (soft delete), almacena la fecha de eliminación si el registro es borrado.
    @DeleteDateColumn({
        type: "timestamp", // Guarda la fecha de eliminación lógica.
        nullable: true,    // Permite valores nulos porque el registro puede no haber sido eliminado.
    })
    deleted_at: Date;
}

export default ClientEntity;