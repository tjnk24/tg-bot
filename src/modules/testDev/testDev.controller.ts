import {Controller, Get} from '@nestjs/common';

import {IsUnprotected} from '__utils/metadata/isUnprotected';

@Controller({
    version: '1',
    path: 'test-dev',
})
export class TestDevController {
    @Get('/test')
    @IsUnprotected()
    test() {
        // eslint-disable-next-line no-console
        console.log('test');
    }
}
