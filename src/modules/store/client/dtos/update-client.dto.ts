// Importa los decoradores de validación de la librería "class-validator".
import {
    IsNotEmpty,
    IsString,
    Length,
    IsEmail,
    IsPhoneNumber,
    IsOptional,
} from "class-validator";

// Define una clase DTO (Data Transfer Object) para la creación de clientes.
class UpdateClientDto {

    @IsOptional()
    // Valida que el campo "dni" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "dni" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del DNI a 200 caracteres.
    @Length(1, 200)
    dni: string;

    @IsOptional()
    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre a 200 caracteres.
    @Length(3, 200)
    name: string;

    @IsOptional()
    // Valida que el campo "surname" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "surname" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del apellido a 200 caracteres.
    @Length(1, 200)
    surname: string;

    @IsOptional()
    // Valida que el campo "email" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "email" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del correo electrónico a 100 caracteres.
    @Length(4, 100)
    // Valida que el campo "email" tenga formato de correo electrónico.
    @IsEmail()
    email: string;

    @IsOptional()
    // Valida que el campo "phone" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "phone" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del teléfono a 200 caracteres.
    @Length(1, 200)
    // Valida que el campo "phone" tenga formato de número de teléfono.
    @IsPhoneNumber("CO") // Puedes especificar el código de país si lo deseas, por ejemplo: "CO" para Colombia.
    phone: string;

    @IsOptional()
    // Valida que el campo "description" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "description" sea una cadena de texto.
    @IsString()
    description: string;
}

export default UpdateClientDto;