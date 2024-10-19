import { Controller, Get } from '@nestjs/common';

@Controller('salary')
export class SalaryController {

    @Get()
    getSalary(): string {
        return 'Salary';
    }

    @Get("abc")
    getSalarsy(): string {
        return 'Salar123y';
    }
}
