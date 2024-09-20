import {Module} from '@nestjs/common';

import {TestDevController} from './testDev.controller';

@Module({
    controllers: [TestDevController],
})
export class TestDevModule {}
