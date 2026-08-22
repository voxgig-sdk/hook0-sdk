import { Hook0EntityBase } from '../Hook0EntityBase';
import type { Hook0SDK } from '../Hook0SDK';
import type { Control } from '../types';
import type { Problem, ProblemListMatch } from '../Hook0Types';
declare class ProblemEntity extends Hook0EntityBase<Problem> {
    constructor(client: Hook0SDK, entopts: any);
    make(this: ProblemEntity): ProblemEntity;
    list(this: any, reqmatch?: ProblemListMatch, ctrl?: Control): Promise<ProblemEntity[]>;
}
export { ProblemEntity };
