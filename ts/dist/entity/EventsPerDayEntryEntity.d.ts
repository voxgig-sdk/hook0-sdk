import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { EventsPerDayEntry, EventsPerDayEntryListMatch } from '../Hook0Types';
declare class EventsPerDayEntryEntity extends Hook0EntityBase<EventsPerDayEntry> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: EventsPerDayEntryEntity): EventsPerDayEntryEntity;
    list(this: any, reqmatch?: EventsPerDayEntryListMatch, ctrl?: Control): Promise<EventsPerDayEntryEntity[]>;
}
export { EventsPerDayEntryEntity };
