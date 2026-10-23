-- Hook0 SDK error

local json = require("dkjson")

local Hook0Error = {}
Hook0Error.__index = Hook0Error

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function Hook0Error.new(code, msg, ctx)
  local self = setmetatable({}, Hook0Error)
  self.is_sdk_error = true
  self.sdk = "Hook0"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function Hook0Error:context()
  return CONTEXT[self]
end


function Hook0Error:error()
  return self.msg
end


function Hook0Error:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function Hook0Error:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function Hook0Error:to_json()
  return json.encode(self:to_table())
end


function Hook0Error:__tostring()
  return self.msg
end


function Hook0Error.__tojson(self)
  return self:to_json()
end


return Hook0Error
