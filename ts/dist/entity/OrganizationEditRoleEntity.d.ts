import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { OrganizationEditRole, OrganizationEditRoleUpdateData } from '../Hook0Types';
declare class OrganizationEditRoleEntity extends Hook0EntityBase<OrganizationEditRole> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: OrganizationEditRoleEntity): OrganizationEditRoleEntity;
    update(this: any, reqdata?: OrganizationEditRoleUpdateData, ctrl?: Control): Promise<OrganizationEditRoleEntity>;
}
export { OrganizationEditRoleEntity };
