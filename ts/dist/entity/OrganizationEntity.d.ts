import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Organization, OrganizationLoadMatch, OrganizationListMatch, OrganizationCreateData, OrganizationUpdateData, OrganizationRemoveMatch } from '../Hook0Types';
declare class OrganizationEntity extends Hook0EntityBase<Organization> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    load(this: any, reqmatch?: OrganizationLoadMatch, ctrl?: Control): Promise<Organization>;
    list(this: any, reqmatch?: OrganizationListMatch, ctrl?: Control): Promise<Organization[]>;
    create(this: any, reqdata?: OrganizationCreateData, ctrl?: Control): Promise<Organization>;
    update(this: any, reqdata?: OrganizationUpdateData, ctrl?: Control): Promise<Organization>;
    remove(this: any, reqmatch?: OrganizationRemoveMatch, ctrl?: Control): Promise<Organization>;
}
export { OrganizationEntity };
