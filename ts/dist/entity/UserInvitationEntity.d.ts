import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { UserInvitation, UserInvitationCreateData } from '../Hook0Types';
declare class UserInvitationEntity extends Hook0EntityBase<UserInvitation> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: UserInvitationEntity): UserInvitationEntity;
    create(this: any, reqdata?: UserInvitationCreateData, ctrl?: Control): Promise<UserInvitation>;
}
export { UserInvitationEntity };
