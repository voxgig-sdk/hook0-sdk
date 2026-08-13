import { Context } from './Context';
declare class Hook0Error extends Error {
    isHook0Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { Hook0Error };
