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
    // Valida que el campo "user_id" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "user_id" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    user_id: number;

    // Valida que el campo "client_id" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "client_id" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    client_id: number;

    // Valida que el campo "number" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "number" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    number: number;

    // Valida que el campo "total_amount" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "total_amount" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 0.
    @Min(0)
    total_amount: number;

    // Valida que el campo "discount" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "discount" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 0.
    @Min(0)
    discount: number;

    // Valida que el campo "tax" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "tax" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 0.
    @Min(0)
    tax: number;

    // Valida que el campo "status" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "status" sea uno de los valores del enum StatusEnum.
    @IsEnum(StatusEnum)
    status: StatusEnum;
}

export default CreateSaleDto;