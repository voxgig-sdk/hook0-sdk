import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { EventType, EventTypeLoadMatch, EventTypeListMatch, EventTypeCreateData } from '../Hook0Types';
declare class EventTypeEntity extends Hook0EntityBase<EventType> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: EventTypeEntity): EventTypeEntity;
    load(this: any, reqmatch?: EventTypeLoadMatch, ctrl?: Control): Promise<EventTypeEntity>;
    list(this: any, reqmatch?: EventTypeListMatch, ctrl?: Control): Promise<EventTypeEntity[]>;
    create(this: any, reqdata?: EventTypeCreateData, ctrl?: Control): Promise<EventTypeEntity>;
}
export { EventTypeEntity };
