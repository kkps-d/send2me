using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTimeOffset CreatedAt { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
