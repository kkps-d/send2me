using backend.Services.Auth;
using System.Security.Claims;

namespace backend.Middlewares
{
    public class TokenAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AuthTokenService _tokenService;

        public TokenAuthenticationMiddleware(RequestDelegate next, AuthTokenService tokenService)
        {
            _next = next;
            _tokenService = tokenService;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue("Authorization", out var tokenHeader))
            {
                var token = tokenHeader.ToString().Replace("Bearer ", "");
                if (_tokenService.ValidateToken(token, out string userId))
                {
                    var claims = new List<Claim> { new(ClaimTypes.NameIdentifier, userId) };
                    var identity = new ClaimsIdentity(claims, "Token");
                    context.User = new ClaimsPrincipal(identity);
                }
            }

            await _next(context);
        }
    }
}
