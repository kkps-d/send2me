global using None = backend.Utils.None;

global using RegisterResult =
    backend.Utils.Result<string, backend.Services.Auth.AuthnServiceErrorCode, string[]>;

global using CreateSessionResult =
    backend.Utils.Result<string, backend.Services.Auth.AuthnServiceErrorCode, backend.Utils.None>;