local api = {} -- main module
local apiname = "astro"

api.errors = {}

-- simple pcall
api.errors.pcall = function(a)
    local ok, err = pcall(a.func, table.unpack(a.args or {}))
    if not ok and a.printerror then
        print(apiname..".pcall: error")
        print(err)
    end
    return ok, err
end

-- xpcall with traceback
api.errors.xpcall = function(a)
    local function errHandler(err)
        if a.printerror then
            print(apiname..".xpcall: error")
            print(err)
        end
        return err
    end
    local ok, err = xpcall(function() a.func(table.unpack(a.args or {})) end, errHandler)
    return ok, err
end

return api
