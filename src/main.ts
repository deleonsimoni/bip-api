import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import passport from "passport";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {


    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('BIP')
        .setDescription('BIP api')
        .setVersion('1.0')
        .addTag('bip')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}

bootstrap();
