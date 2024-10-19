import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';

interface SwaggerDoc {
    paths?: Record<string, any>;
    components?: {
        schemas?: Record<string, any>;
    };
}

@Controller('swagger')
export class SwaggerAggregatorController {
    @Get()
    async getCombinedSwagger(@Res() res: Response) {
        try {
            const gatewaySwagger = await axios.get<SwaggerDoc>('http://localhost:2000/swagger-json');
            const usersSwagger = await axios.get<SwaggerDoc>('http://localhost:2001/swagger-json');

            const combinedSwagger: SwaggerDoc = {
                ...(typeof gatewaySwagger.data === 'object' ? gatewaySwagger.data : {}),
                paths: {
                    ...(typeof gatewaySwagger.data.paths === 'object' ? gatewaySwagger.data.paths : {}),
                    ...(typeof usersSwagger.data.paths === 'object' ? usersSwagger.data.paths : {}),
                },
                components: {
                    ...(typeof gatewaySwagger.data.components === 'object' ? gatewaySwagger.data.components : {}),
                    ...(typeof usersSwagger.data.components === 'object' ? usersSwagger.data.components : {}),
                },
            };

            res.json(combinedSwagger);
        } catch (error) {
            console.error('Error fetching Swagger JSON:', error);
            res.status(500).send('Failed to combine Swagger');
        }
    }
}