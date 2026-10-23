import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        debug: {
            options: {
                active: boolean;
                max: number;
                redact: string[];
            };
            optspec: {
                now: string;
                onEntry: string;
            };
            strict: boolean;
            transport: string;
        };
        idempotency: {
            options: {
                active: boolean;
                header: string;
                methods: string[];
                ops: string[];
            };
            optspec: {
                keygen: string;
            };
            strict: boolean;
            transport: string;
        };
        metrics: {
            options: {
                active: boolean;
            };
            optspec: {
                now: string;
            };
            strict: boolean;
            transport: string;
        };
        paging: {
            options: {
                active: boolean;
                afterVar: string;
                cursorParam: string;
                firstVar: string;
                limitParam: string;
                pageParam: string;
                startPage: number;
            };
            optspec: {
                limit: string;
                ops: string;
            };
            strict: boolean;
            transport: string;
        };
        ratelimit: {
            options: {
                active: boolean;
                burst: number;
                rate: number;
            };
            optspec: {
                now: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        retry: {
            options: {
                active: boolean;
                factor: number;
                maxDelay: number;
                minDelay: number;
                retries: number;
                statuses: number[];
            };
            optspec: {
                jitter: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        secrets: {
            options: {
                active: boolean;
                cache: boolean;
                exchange: {
                    active: boolean;
                    method: string;
                    path: string;
                    refresh: string;
                    request: string;
                    response: string;
                    retries: number;
                    statuses: number[];
                };
                name: string;
                providers: never[];
            };
            optspec: {};
            strict: boolean;
            transport: string;
        };
        test: {
            options: {
                active: boolean;
            };
            optspec: {
                entity: string;
                net: string;
            };
            strict: boolean;
            transport: string;
        };
        timeout: {
            options: {
                active: boolean;
                ms: number;
            };
            optspec: {
                clearTimer: string;
                now: string;
                setTimer: string;
            };
            strict: boolean;
            transport: string;
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
            email_preference: {};
            error: {};
            event: {};
            event_type: {};
            events_management: {};
            health: {};
            hook0: {};
            ingested_event: {};
            instance: {};
            login: {};
            organization: {};
            organization_edit_role: {};
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
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
                short?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd?: undefined;
                                field?: undefined;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                application_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                application_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                application_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        application_secret: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                format: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                application_secret_token: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                application_secret_token: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        email_preference: {
            fields: never[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {
                            $action: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        error: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        event: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                event_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                event_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        event_type: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                event_type_name: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                event_type_name: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        events_management: {
            fields: never[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        health: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                format: string;
                req?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        hook0: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        ingested_event: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        instance: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        login: {
            fields: {
                name: string;
                title: string;
                type: string;
                req: boolean;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        organization: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd?: undefined;
                                field?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    })[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        organization_edit_role: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                organization_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        quota: {
            fields: {
                name: string;
                title: string;
                type: string;
                req: boolean;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        registration: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        request_attempt: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                format: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd?: undefined;
                                field?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                field: boolean;
                                reqd?: undefined;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                request_attempt_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        response: {
            fields: ({
                name: string;
                title: string;
                type: string;
                format?: undefined;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                format: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                response_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
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
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        service_token: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                service_token_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                service_token_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                service_token_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        subscription: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
                op?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                op: {
                    create: {
                        type: string;
                    };
                    update: {
                        type: string;
                    };
                };
                format?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                format?: undefined;
                op?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
                op?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                op: {
                    create: {
                        type: string;
                    };
                    update: {
                        type: string;
                    };
                };
                short: string;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                subscription_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                subscription_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {
                            param: {
                                subscription_id: string;
                            };
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user_authentication: {
            fields: {
                name: string;
                title: string;
                type: string;
                req: boolean;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user_invitation: {
            fields: {
                name: string;
                title: string;
                type: string;
                req: boolean;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
