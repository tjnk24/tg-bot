import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import fs from 'fs';
import {Document as YamlDocument} from 'yaml';

export const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Nestjs boilerplate')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    const yamlDocument = new YamlDocument(document);
    fs.writeFileSync('./swagger-spec.yaml', yamlDocument.toString());
};
