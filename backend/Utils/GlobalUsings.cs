global using CreateSessionResult =
    backend.Utils.Result<string, backend.Services.Auth.AuthnServiceErrorCode, backend.Utils.None>;
global using None = backend.Utils.None;
global using RegisterResult =
    backend.Utils.Result<string, backend.Services.Auth.AuthnServiceErrorCode, string[]>;
global using CreateMessageResult = backend.Utils.Result<int, backend.Services.App.MessagesServiceErrorCode, backend.Utils.None>;
global using GetMessagesResult = backend.Utils.Result<System.Collections.Generic.List<backend.Models.Message>, backend.Services.App.MessagesServiceErrorCode, backend.Utils.None>;