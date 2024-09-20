import {SetMetadata} from '@nestjs/common/decorators/core/set-metadata.decorator';

export const METADATA_KEY = 'isUnprotected';

export const IsUnprotected = () => SetMetadata(METADATA_KEY, true);
