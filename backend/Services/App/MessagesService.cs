using backend.DbContexts;
using backend.Models;
using backend.Services.Auth;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.App
{
    public class MessagesService(
        AppDataDbContext context,
        AuthnService authnService
        )
    {
        private readonly AppDataDbContext db = context;
        private readonly AuthnService _authnService = authnService;

        public async Task<List<Message>> GetMessages()
        {
            return await db.Messages.ToListAsync();
        }

        public async Task<GetMessagesResult> GetMessages(string username, int? fromId, int pageSize)
        {
            bool userExists = await _authnService.DoesUserExist(username);
            if (!userExists)
            {
                return GetMessagesResult.Failure(MessagesServiceErrorCode.InvalidUserId, None.Value);
            }

            IQueryable<Message> query = db.Messages
                .Where(m => m.UserId == username)
                .OrderByDescending(m => m.MessageId);

            if (fromId.HasValue)
            {
                query = query.Where(m => m.MessageId <=  fromId.Value);
            }

            List<Message> result = await query.Take(pageSize).ToListAsync();

            return GetMessagesResult.Success(result);
        }

        public async Task<CreateMessageResult> CreateMessage(string username, string content)
        {
            if (string.IsNullOrWhiteSpace(content))
            {
                return CreateMessageResult.Failure(MessagesServiceErrorCode.NoContent, None.Value);
            }

            bool userExists = await _authnService.DoesUserExist(username);
            if (!userExists)
            {
                return CreateMessageResult.Failure(MessagesServiceErrorCode.InvalidUserId, None.Value);
            }

            Message message = new()
            {
                Content = content,
                CreatedAt = DateTimeOffset.Now,
                UserId = username,
            };

            await db.Messages.AddAsync(message);
            await db.SaveChangesAsync();

            return CreateMessageResult.Success(message.MessageId);
        }
    }

    public enum MessagesServiceErrorCode
    {
        NoContent,
        InvalidUserId
    }

}
