using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/v1/me")]
    [ApiController]
    public class MeController : ControllerBase
    {
        [Authorize]
        [HttpGet("", Name = "GetMe")]
        public async Task<IActionResult> Me()
        {
            string? username = Request.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(username))
            {
                return StatusCode(500);
            }

            // TODO: In the future, could send down preferences too, move this to a service
            return Ok(new { username });
        }
    }
}
