import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Hook0, Hook0ListMatch } from '../Hook0Types';
declare class Hook0Entity extends Hook0EntityBase<Hook0> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: Hook0Entity): Hook0Entity;
    list(this: any, reqmatch?: Hook0ListMatch, ctrl?: Control): Promise<Hook0[]>;
}
export { Hook0Entity };
