package core

import "encoding/json"

type Hook0Error struct {
	IsHook0Error bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
}

func NewHook0Error(code string, msg string, ctx *Context) *Hook0Error {
	return &Hook0Error{
		IsHook0Error: true,
		Sdk:                "Hook0",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
	}
}

func (e *Hook0Error) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *Hook0Error) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *Hook0Error) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
