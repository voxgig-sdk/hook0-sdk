import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { ApplicationsManagement, ApplicationsManagementRemoveMatch } from '../Hook0Types';
declare class ApplicationsManagementEntity extends Hook0EntityBase<ApplicationsManagement> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ApplicationsManagementEntity): ApplicationsManagementEntity;
    remove(this: any, reqmatch?: ApplicationsManagementRemoveMatch, ctrl?: Control): Promise<ApplicationsManagement>;
}
export { ApplicationsManagementEntity };
