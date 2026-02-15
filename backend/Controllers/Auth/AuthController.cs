using backend.DTOs.Auth;
using backend.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Auth
{
    [Route("api/v1/auth")]
    [ApiController]
    public class AuthController(
        AuthnService authService,
        IWebHostEnvironment env
        ) : ControllerBase
    {
        private AuthnService _authService = authService;
        private IWebHostEnvironment _env = env;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            RegisterResult result = await _authService.RegisterUser(dto.UserName, dto.Password);

            if (!result.IsSuccess)
            {
                return BadRequest(result.ErrorPayload);
            }

            return Ok(new { username = dto.UserName });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            CreateSessionResult result = await _authService.CreateSession(dto.UserName, dto.Password);

            if (!result.IsSuccess)
            {
                return Unauthorized(new { errorCode = result.ErrorCode.ToString() });
            }

            string sessionToken = result.Payload!;
            bool wantsCookie = Request.Headers.Accept.Any(h => h!.Contains("text/html"));

            if (wantsCookie)
            {
                // This is for browsers, will push a cookie
                Response.Cookies.Append(
                    "sessionToken",
                    sessionToken,
                    new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = _env.IsDevelopment() ? SameSiteMode.None : SameSiteMode.Lax,
                        Path = "/",
                        Expires = DateTime.UtcNow.AddMinutes(3600)
                    }
                );

                return Ok();
            }

            return Ok(new { sessionToken = result.Payload });
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Items.TryGetValue("sessionToken", out var obj);

            string sessionToken = obj!.ToString()!;

            await _authService.DestroySessionByToken(sessionToken);

            return Ok();
        }
    }

    #region Related DTOs
    public class LoginDto
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class RegisterDto
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
    #endregion
}
