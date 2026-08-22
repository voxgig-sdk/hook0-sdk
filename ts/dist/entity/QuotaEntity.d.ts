import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Quota, QuotaLoadMatch } from '../Hook0Types';
declare class QuotaEntity extends Hook0EntityBase<Quota> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: QuotaEntity): QuotaEntity;
    load(this: any, reqmatch?: QuotaLoadMatch, ctrl?: Control): Promise<QuotaEntity>;
}
export { QuotaEntity };
