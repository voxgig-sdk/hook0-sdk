"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hook0Error = void 0;
class Hook0Error extends Error {
    isHook0Error = true;
    sdk = 'Hook0';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Hook0Error = Hook0Error;
//# sourceMappingURL=Hook0Error.js.map