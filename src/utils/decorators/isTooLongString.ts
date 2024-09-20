import {MaxLength} from 'class-validator';

export const IsTooLongString = () => MaxLength(255, {message: 'The value is too long'});
