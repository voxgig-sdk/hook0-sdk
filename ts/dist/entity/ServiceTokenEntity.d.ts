import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { ServiceToken, ServiceTokenLoadMatch, ServiceTokenListMatch, ServiceTokenCreateData, ServiceTokenUpdateData, ServiceTokenRemoveMatch } from '../Hook0Types';
declare class ServiceTokenEntity extends Hook0EntityBase<ServiceToken> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ServiceTokenEntity): ServiceTokenEntity;
    load(this: any, reqmatch?: ServiceTokenLoadMatch, ctrl?: Control): Promise<ServiceTokenEntity>;
    list(this: any, reqmatch?: ServiceTokenListMatch, ctrl?: Control): Promise<ServiceTokenEntity[]>;
    create(this: any, reqdata?: ServiceTokenCreateData, ctrl?: Control): Promise<ServiceTokenEntity>;
    update(this: any, reqdata?: ServiceTokenUpdateData, ctrl?: Control): Promise<ServiceTokenEntity>;
    remove(this: any, reqmatch?: ServiceTokenRemoveMatch, ctrl?: Control): Promise<ServiceTokenEntity>;
}
export { ServiceTokenEntity };
