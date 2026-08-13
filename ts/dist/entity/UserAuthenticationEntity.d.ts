import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { UserAuthentication, UserAuthenticationCreateData } from '../Hook0Types';
declare class UserAuthenticationEntity extends Hook0EntityBase<UserAuthentication> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: UserAuthenticationEntity): UserAuthenticationEntity;
    create(this: any, reqdata?: UserAuthenticationCreateData, ctrl?: Control): Promise<UserAuthentication>;
}
export { UserAuthenticationEntity };
