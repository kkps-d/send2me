using System.Collections.Concurrent;

namespace backend.Services.Auth
{
    public class InMemoryTokenStore : ITokenStore
    {
        private readonly ConcurrentDictionary<string, string> _usernameByToken = [];

        public Task<string> CreateTokenAsync(string username)
        {
            string token = Guid.NewGuid().ToString("N");
            _usernameByToken[token] = username;
            return Task.FromResult(token);
        }

        public Task<string?> GetUsernameByTokenAsync(string token)
        {
            bool success = _usernameByToken.TryGetValue(token, out string? username);
            return Task.FromResult(success ? username : null);
        }

        public Task RevokeTokenByTokenStringAsync(string token)
        {
            _usernameByToken.TryRemove(token, out _);
            return Task.CompletedTask;
        }

        public async Task RevokeTokensByUserNameAsync(string username)
        {
            List<string> tokensToRemove = _usernameByToken
                .Where(kvp => kvp.Value == username)
                .Select(kvp => kvp.Key)
                .ToList();

            foreach (string token in tokensToRemove)
            {
                await RevokeTokenByTokenStringAsync(token);
            }

            return;
        }
    }
}
