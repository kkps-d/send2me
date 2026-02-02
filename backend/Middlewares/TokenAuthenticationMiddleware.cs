using backend.Services.Auth;
using System.Security.Claims;

namespace backend.Middlewares
{
    public class TokenAuthenticationMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            string? username = null;
            string? sessionToken = null;

            if (context.Request.Cookies.TryGetValue("sessionToken", out sessionToken))
            {
                AuthnService authnService = context.RequestServices.GetRequiredService<AuthnService>();
                username = await authnService.GetUsernameFromToken(sessionToken);
            }
            else if (context.Request.Headers.TryGetValue("Authorization", out var tokenHeader))
            {
                AuthnService authnService = context.RequestServices.GetRequiredService<AuthnService>();
                sessionToken = tokenHeader.ToString().Replace("Bearer ", "");
                username = await authnService.GetUsernameFromToken(sessionToken);
            }

            if (!string.IsNullOrEmpty(username))
            {
                // TODO: Later fetch more claims for permissions from AuthzService once implemented
                var claims = new List<Claim> {
                    new(ClaimTypes.NameIdentifier, username)
                };
                var identity = new ClaimsIdentity(claims, "Token");
                context.User = new ClaimsPrincipal(identity);
                context.Items["sessionToken"] = sessionToken!;
            }

            // If no authorization header, still let request continue, as there are unauthenticated endpoints. Authenticated endpoints with [Authorize] attribute should block it

            await _next(context);
        }
    }
}
