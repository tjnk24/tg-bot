import {FingerprintParameter} from 'express-fingerprint';

import {FINGERPRINT_HEADERS} from '../consts';

export const fingerprintParams: FingerprintParameter = (next, request) => {
    const headers = request['headers'];

    const fingerprintHeaders = {};

    FINGERPRINT_HEADERS.forEach(header => {
        fingerprintHeaders[header] = headers?.[header];
    });

    next(null, fingerprintHeaders);
};
