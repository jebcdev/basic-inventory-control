// Importa los decoradores de validación de la librería "class-validator".
import {
    IsNotEmpty,
    IsInt,
    IsNumber,
    Min,
    IsEnum,
} from "class-validator";

// Importa el enum StatusEnum desde la entidad.
import { StatusEnum } from "../entities/sale.entity";

// Define una clase DTO (Data Transfer Object) para la creación de ventas.
class CreateSaleDto {

    // Valida que el campo "number" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "number" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    id: number;

    // Valida que el campo "status" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "status" sea uno de los valores del enum StatusEnum.
    @IsEnum(StatusEnum)
    status: StatusEnum;
}

export default CreateSaleDto;