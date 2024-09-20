import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';

import {ValidationException} from '__exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
    async transform(value: unknown, metadata: ArgumentMetadata) {
        const obj = plainToInstance<Record<string, unknown>, unknown>(metadata.metatype, value);

        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map(error => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
            });

            throw new ValidationException(messages);
        }

        return value;
    }
}
