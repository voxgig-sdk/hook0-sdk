-- Hook0 SDK error

local Hook0Error = {}
Hook0Error.__index = Hook0Error


function Hook0Error.new(code, msg, ctx)
  local self = setmetatable({}, Hook0Error)
  self.is_sdk_error = true
  self.sdk = "Hook0"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Hook0Error:error()
  return self.msg
end


function Hook0Error:__tostring()
  return self.msg
end


return Hook0Error
