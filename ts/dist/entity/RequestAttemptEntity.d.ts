import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { RequestAttempt, RequestAttemptLoadMatch, RequestAttemptListMatch } from '../Hook0Types';
declare class RequestAttemptEntity extends Hook0EntityBase<RequestAttempt> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: RequestAttemptEntity): RequestAttemptEntity;
    load(this: any, reqmatch?: RequestAttemptLoadMatch, ctrl?: Control): Promise<RequestAttemptEntity>;
    list(this: any, reqmatch?: RequestAttemptListMatch, ctrl?: Control): Promise<RequestAttemptEntity[]>;
}
export { RequestAttemptEntity };
