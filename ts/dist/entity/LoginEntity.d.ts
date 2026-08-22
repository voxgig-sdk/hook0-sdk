import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Login, LoginCreateData } from '../Hook0Types';
declare class LoginEntity extends Hook0EntityBase<Login> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: LoginEntity): LoginEntity;
    create(this: any, reqdata?: LoginCreateData, ctrl?: Control): Promise<LoginEntity>;
}
export { LoginEntity };
