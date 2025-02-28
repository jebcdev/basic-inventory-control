// Importa los decoradores de validación de la librería "class-validator".
import {
    IsNotEmpty,
    IsString,
    Length,
    IsInt,
    IsNumber,
    Min,
    IsUrl,
    IsOptional,
} from "class-validator";

// Define una clase DTO (Data Transfer Object) para la creación de productos.
class UpdateProductDto {
    @IsOptional()
    // Valida que el campo "category_id" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "category_id" sea un número entero.
    @IsInt()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    category_id: number;

    @IsOptional()
    // Valida que el campo "code" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "code" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del código a 200 caracteres.
    @Length(4, 200)
    code: string;

    @IsOptional()
    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre a 200 caracteres.
    @Length(4, 200)
    name: string;

    @IsOptional()
    // Valida que el campo "slug" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "slug" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del slug a 250 caracteres.
    @Length(4, 250)
    slug: string;

    @IsOptional()
    // Valida que el campo "description" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "description" sea una cadena de texto.
    @IsString()
    description: string;

    @IsOptional()
    // Valida que el campo "image" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "image" sea una cadena de texto.
    @IsString()
    // Valida que el campo "image" sea una URL válida.
    // @IsUrl()
    // Restringe la longitud de la URL de la imagen a 250 caracteres.
    @Length(4, 250)
    image: string;

    @IsOptional()
    // Valida que el campo "quantity" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "quantity" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 1.
    @Min(1)
    quantity: number;

    @IsOptional()
    // Valida que el campo "price" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "price" sea un número.
    @IsNumber()
    // Asegura que el valor sea mayor o igual a 0.
    @Min(0)
    price: number;
}

export default UpdateProductDto;