import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
export class CreateBlogDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    published: boolean = false; // Mặc định là false nếu không cung cấp

    @ApiProperty()
    @IsString()
    @IsOptional()
    userId?: string; // ID người dùng, có thể tùy chọn
}
