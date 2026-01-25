namespace backend.Services.Auth
{
    public class AuthTokenService
    {
        private readonly Dictionary<string, string> _tokens = new();

        public string GenerateToken(string userId)
        {
            var token = Guid.NewGuid().ToString("N");
            _tokens[token] = userId;
            return token;
        }

        public bool ValidateToken(string token, out string userId)
        {
            return _tokens.TryGetValue(token, out userId!);
        }

        public void InvalidateToken(string token)
        {
            _tokens.Remove(token);
        }
    }
}
