import { BaseFeature } from './feature/base/BaseFeature';
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    main: {
        name: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            application: {};
            application_secret: {};
            applications_management: {};
            event: {};
            event_type: {};
            events_management: {};
            events_per_day_entry: {};
            health: {};
            hook0: {};
            ingested_event: {};
            instance: {};
            login: {};
            organization: {};
            organization_edit_role: {};
            problem: {};
            quota: {};
            registration: {};
            request_attempt: {};
            response: {};
            revoke: {};
            service_token: {};
            subscription: {};
            user_authentication: {};
            user_invitation: {};
        };
    };
    entity: {
        application: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                application_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                application_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                application_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        application_secret: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                application_secret_token: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        applications_management: {
            fields: never[];
            name: string;
            op: {
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        event: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                event_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        event_type: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                event_type_name: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        events_management: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        events_per_day_entry: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        health: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        hook0: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        ingested_event: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        instance: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        login: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        organization: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        organization_edit_role: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        problem: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        quota: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        registration: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        request_attempt: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                request_attempt_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        response: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                response_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        revoke: {
            fields: never[];
            name: string;
            op: {
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        service_token: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                service_token_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                service_token_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                service_token_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        subscription: {
            fields: ({
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
                op?: undefined;
            } | {
                active: boolean;
                name: string;
                op: {
                    create: {
                        req: boolean;
                        type: string;
                    };
                    update: {
                        req: boolean;
                        type: string;
                    };
                };
                req: boolean;
                type: string;
                index$: number;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                subscription_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                subscription_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                subscription_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user_authentication: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user_invitation: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
    };
}
declare const config: Config;
export { config };
