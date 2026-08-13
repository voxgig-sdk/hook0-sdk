import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Instance, InstanceLoadMatch } from '../Hook0Types';
declare class InstanceEntity extends Hook0EntityBase<Instance> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: InstanceEntity): InstanceEntity;
    load(this: any, reqmatch?: InstanceLoadMatch, ctrl?: Control): Promise<Instance>;
}
export { InstanceEntity };
