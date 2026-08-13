import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Subscription, SubscriptionLoadMatch, SubscriptionListMatch, SubscriptionCreateData, SubscriptionUpdateData, SubscriptionRemoveMatch } from '../Hook0Types';
declare class SubscriptionEntity extends Hook0EntityBase<Subscription> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: SubscriptionEntity): SubscriptionEntity;
    load(this: any, reqmatch?: SubscriptionLoadMatch, ctrl?: Control): Promise<Subscription>;
    list(this: any, reqmatch?: SubscriptionListMatch, ctrl?: Control): Promise<Subscription[]>;
    create(this: any, reqdata?: SubscriptionCreateData, ctrl?: Control): Promise<Subscription>;
    update(this: any, reqdata?: SubscriptionUpdateData, ctrl?: Control): Promise<Subscription>;
    remove(this: any, reqmatch?: SubscriptionRemoveMatch, ctrl?: Control): Promise<Subscription>;
}
export { SubscriptionEntity };
