import {VersioningType} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import cookieParser from 'cookie-parser';
import Fingerprint from 'express-fingerprint';

import {ValidationPipe} from '__pipes/validation.pipe';
import {fingerprintParams} from '__utils/initialize/fingerprintParams';
import {initSwagger} from '__utils/initialize/initSwagger';

import {AppModule} from './app/app.module';
import {COOKIE_KEY, PORT} from './config';

const start = async () => {
    const app = await NestFactory.create(AppModule);

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.use(cookieParser(COOKIE_KEY));

    app.useGlobalPipes(new ValidationPipe());

    app.use(Fingerprint({
        parameters: [fingerprintParams],
    }));

    initSwagger(app);

    // eslint-disable-next-line no-console
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

void start();
