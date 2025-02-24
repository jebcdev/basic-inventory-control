// Importa los decoradores de validación de la librería "class-validator".
import {
    IsNotEmpty,
    IsInt,
    IsNumber,
    Min,
    IsEnum,
} from "class-validator";

// Importa el enum StatusEnum desde la entidad.
import { StatusEnum } from "../entities/sale-details.entity";

// Define una clase DTO (Data Transfer Object) para la creación de detalles de venta.
class CreateSaleDetailsDto {
    // Valida que el campo "sale_id" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "sale_id" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    sale_id: number;

    // Valida que el campo "product_id" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "product_id" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    product_id: number;

    // Valida que el campo "quantity" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "quantity" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    quantity: number;

    // Valida que el campo "unit_price" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "unit_price" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 0.
    @Min(0)
    unit_price: number;

    // Valida que el campo "sub_total" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "sub_total" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 0.
    @Min(0)
    sub_total: number;

    // Valida que el campo "status" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "status" sea uno de los valores del enum StatusEnum.
    @IsEnum(StatusEnum)
    status: StatusEnum;
}

export default CreateSaleDetailsDto;