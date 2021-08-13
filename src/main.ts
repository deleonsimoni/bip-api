import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";
import {config} from 'aws-sdk';

async function bootstrap() {


    const app = await NestFactory.create(AppModule, {cors: true});
    const swaggerConfig = new DocumentBuilder()
        .setTitle('BIP')
        .setDescription('BIP api')
        .setVersion('1.0')
        .addTag('bip')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
/*
    const configService = app.get(ConfigService);
    config.update({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
    });
*/
    await app.listen(3000);
}

bootstrap();
