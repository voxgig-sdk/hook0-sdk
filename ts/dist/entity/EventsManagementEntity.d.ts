import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { EventsManagement, EventsManagementListMatch, EventsManagementRemoveMatch } from '../Hook0Types';
declare class EventsManagementEntity extends Hook0EntityBase<EventsManagement> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: EventsManagementEntity): EventsManagementEntity;
    list(this: any, reqmatch?: EventsManagementListMatch, ctrl?: Control): Promise<EventsManagementEntity[]>;
    remove(this: any, reqmatch?: EventsManagementRemoveMatch, ctrl?: Control): Promise<EventsManagementEntity>;
}
export { EventsManagementEntity };
