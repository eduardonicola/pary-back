import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';

/**
 * Bootstraps the NestJS application by creating an instance of the `AppModule` and starting the server on the specified port.
 *
 * This function is the entry point of the application and is responsible for initializing the NestJS application and starting the server.
 *
 * @returns {Promise<void>} A promise that resolves when the server has started listening for incoming requests.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,  // Remove propriedades não declaradas no DTO
    forbidNonWhitelisted: true,  // Gera erro se campos não permitidos forem enviados
    transform: true,  // Habilita transformações usando class-transformer
  }))

  app.enableCors({
    origin: '*', // URL da sua aplicação front-end (Next.js ou qualquer outra)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });

  await app.listen(env.SERVICE_PORT, env.SERVICE_HOST);
  console.log(`\x1b[32mApplication is running on: ${await app.getUrl()}\x1b[0m`);
}
bootstrap();
