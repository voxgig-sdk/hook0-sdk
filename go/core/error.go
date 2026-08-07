package core

type Hook0Error struct {
	IsHook0Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHook0Error(code string, msg string, ctx *Context) *Hook0Error {
	return &Hook0Error{
		IsHook0Error: true,
		Sdk:              "Hook0",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Hook0Error) Error() string {
	return e.Msg
}
