import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Application, ApplicationLoadMatch, ApplicationListMatch, ApplicationCreateData, ApplicationUpdateData, ApplicationRemoveMatch } from '../Hook0Types';
declare class ApplicationEntity extends Hook0EntityBase<Application> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ApplicationEntity): ApplicationEntity;
    load(this: any, reqmatch?: ApplicationLoadMatch, ctrl?: Control): Promise<ApplicationEntity>;
    list(this: any, reqmatch?: ApplicationListMatch, ctrl?: Control): Promise<ApplicationEntity[]>;
    create(this: any, reqdata?: ApplicationCreateData, ctrl?: Control): Promise<ApplicationEntity>;
    update(this: any, reqdata?: ApplicationUpdateData, ctrl?: Control): Promise<ApplicationEntity>;
    remove(this: any, reqmatch?: ApplicationRemoveMatch, ctrl?: Control): Promise<ApplicationEntity>;
}
export { ApplicationEntity };
