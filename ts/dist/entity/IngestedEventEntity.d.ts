import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { IngestedEvent, IngestedEventCreateData } from '../Hook0Types';
declare class IngestedEventEntity extends Hook0EntityBase<IngestedEvent> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: IngestedEventEntity): IngestedEventEntity;
    create(this: any, reqdata?: IngestedEventCreateData, ctrl?: Control): Promise<IngestedEvent>;
}
export { IngestedEventEntity };
