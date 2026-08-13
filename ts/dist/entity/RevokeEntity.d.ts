import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Revoke, RevokeRemoveMatch } from '../Hook0Types';
declare class RevokeEntity extends Hook0EntityBase<Revoke> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: RevokeEntity): RevokeEntity;
    remove(this: any, reqmatch?: RevokeRemoveMatch, ctrl?: Control): Promise<Revoke>;
}
export { RevokeEntity };
