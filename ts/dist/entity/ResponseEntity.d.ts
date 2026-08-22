import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Response, ResponseLoadMatch } from '../Hook0Types';
declare class ResponseEntity extends Hook0EntityBase<Response> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ResponseEntity): ResponseEntity;
    load(this: any, reqmatch?: ResponseLoadMatch, ctrl?: Control): Promise<ResponseEntity>;
}
export { ResponseEntity };
