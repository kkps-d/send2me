namespace backend.Services.Auth
{
    public interface ITokenStore
    {
        public Task<string> CreateTokenAsync(string username);
        public Task<string?> GetUsernameByTokenAsync(string token);
        public Task RevokeTokenByTokenStringAsync(string token);
        public Task RevokeTokensByUserNameAsync(string username);
    }
}
