// Importa los decoradores de validación de la librería "class-validator".
import {
    IsNotEmpty,
    IsString,
    Length,
} from "class-validator";

// Define una clase DTO (Data Transfer Object) para la creación de categorías.
class CreateCategoryDto {
    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre a 200 caracteres.
    @Length(4, 200)
    name: string;

    // Valida que el campo "slug" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "slug" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del slug a 250 caracteres.
    @Length(4, 250)
    slug: string;

    // Valida que el campo "description" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "description" sea una cadena de texto.
    @IsString()
    description: string;
}

export default CreateCategoryDto;