import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { ApplicationSecret, ApplicationSecretListMatch, ApplicationSecretCreateData, ApplicationSecretUpdateData } from '../Hook0Types';
declare class ApplicationSecretEntity extends Hook0EntityBase<ApplicationSecret> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ApplicationSecretEntity): ApplicationSecretEntity;
    list(this: any, reqmatch?: ApplicationSecretListMatch, ctrl?: Control): Promise<ApplicationSecret[]>;
    create(this: any, reqdata?: ApplicationSecretCreateData, ctrl?: Control): Promise<ApplicationSecret>;
    update(this: any, reqdata?: ApplicationSecretUpdateData, ctrl?: Control): Promise<ApplicationSecret>;
}
export { ApplicationSecretEntity };
