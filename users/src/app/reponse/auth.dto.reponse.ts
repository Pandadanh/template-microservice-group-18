import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDtoResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ required: false })
    address?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    createdAt?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    updatedAt?: string;
}