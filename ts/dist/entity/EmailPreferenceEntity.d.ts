import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { EmailPreference, EmailPreferenceCreateData } from '../Hook0Types';
declare class EmailPreferenceEntity extends Hook0EntityBase<EmailPreference> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: EmailPreferenceEntity): EmailPreferenceEntity;
    create(this: any, reqdata?: EmailPreferenceCreateData, ctrl?: Control): Promise<EmailPreferenceEntity>;
}
export { EmailPreferenceEntity };
