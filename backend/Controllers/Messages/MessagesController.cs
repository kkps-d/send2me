using backend.Models;
using backend.Services.App;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers.Messages
{
    [Route("api/v1/messages")]
    [ApiController]
    [Authorize]
    public class MessagesController(
        MessagesService messagesService
        ) : ControllerBase
    {
        private readonly MessagesService _messagesService = messagesService;

        [HttpGet("", Name = "GetMessages")]
        public async Task<IActionResult> GetMessages([FromQuery] int? fromId, [FromQuery] int? pageSize)
        {
            int _pageSize = pageSize ?? 25;
            string username = Request.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            GetMessagesResult result = await _messagesService.GetMessages(username, fromId, _pageSize);

            if (!result.IsSuccess)
            {
                // Only case is user does not exist, which shouldn't happen
                return StatusCode(500);
            }

            List<MessageDto> messageDtos = result.Payload!.Select(m => new MessageDto
            {
                MessageId = m.MessageId,
                Content = m.Content,
                CreatedAt = m.CreatedAt
            }).ToList();

            MessagesResponse messagesResponse = new()
            {
                // Check GetMessages implementation, id filter is inclusive, so subtract 1.
                // cursor should be left as string so future changes don't require frontend changes
                NextCursor = $"{messageDtos.First().MessageId - 1}", 
                Messages = messageDtos
            };

            return Ok(messagesResponse);
        }

        [HttpPost("", Name = "PostMessage")]
        public async Task<IActionResult> PostMessage([FromBody] NewMessageDto newMessage)
        {
            if (string.IsNullOrWhiteSpace(newMessage.Content))
            {
                return BadRequest(new { Error = PostMessageErrors.NoContent });
            }

            string username = Request.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            CreateMessageResult result = await _messagesService.CreateMessage(username, newMessage.Content);

            if (!result.IsSuccess)
            {
                if (result.ErrorCode == MessagesServiceErrorCode.NoContent)
                {
                    return BadRequest(new MessageErrorResponse()
                    {
                        Error = PostMessageErrors.NoContent
                    });
                }
                else
                {
                    return StatusCode(500);
                }
            }

            return Ok(new NewMessageSuccessResponse()
            {
                NewMessageId = result.Payload,
            });
        }
    }

    #region Errors
    public static class PostMessageErrors
    {
        public const string NoContent = "No message content is provided!";
    }
    #endregion

    #region Related responses/DTOs
    public class MessagesResponse
    {
        public List<MessageDto> Messages { get; set; } = new();
        public string? NextCursor { get; set; }
    }

    public class MessageDto
    {
        public int MessageId { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
        public string Content { get; set; } = string.Empty;
    }

    public class NewMessageDto
    {
        public string Content { get; set; } = string.Empty;
    }

    public class NewMessageSuccessResponse
    {
        public int NewMessageId { get; set; }
    }

    public class MessageErrorResponse
    {
        public string Error { get; set; } = string.Empty;
    }
    #endregion
}
