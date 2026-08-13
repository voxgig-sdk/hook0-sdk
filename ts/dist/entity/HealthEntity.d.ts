import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../Hook0Types';
declare class HealthEntity extends Hook0EntityBase<Health> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<Health>;
}
export { HealthEntity };
