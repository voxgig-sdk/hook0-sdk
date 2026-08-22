import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Registration, RegistrationCreateData } from '../Hook0Types';
declare class RegistrationEntity extends Hook0EntityBase<Registration> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: RegistrationEntity): RegistrationEntity;
    create(this: any, reqdata?: RegistrationCreateData, ctrl?: Control): Promise<RegistrationEntity>;
}
export { RegistrationEntity };
