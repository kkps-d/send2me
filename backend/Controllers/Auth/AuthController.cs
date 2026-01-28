using backend.DTOs.Auth;
using backend.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(
        AuthnService authService
        ) : ControllerBase
    {
        private AuthnService _authService = authService;

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

            return Ok(new { token = result.Payload });
        }
    }
}
