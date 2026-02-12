using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Message
{
    [Route("api/v1/messages")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        [HttpGet("", Name = "GetMessages")]
        public async Task<IActionResult> GetMessages()
        {
            return Ok(new { messages = new[] { "Hello", "world!" } });
        }
    }
}
