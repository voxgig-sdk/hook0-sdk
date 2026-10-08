import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { ErrorType, ErrorListMatch } from '../Hook0Types';
declare class ErrorEntity extends Hook0EntityBase<ErrorType> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ErrorEntity): ErrorEntity;
    list(this: any, reqmatch?: ErrorListMatch, ctrl?: Control): Promise<ErrorEntity[]>;
}
export { ErrorEntity };
