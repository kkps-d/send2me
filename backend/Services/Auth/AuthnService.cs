using Microsoft.AspNetCore.Identity;

namespace backend.Services.Auth
{
    public class AuthnService(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        ITokenStore tokenStore
        )
    {
        private readonly UserManager<IdentityUser> _userManager = userManager;
        private readonly SignInManager<IdentityUser> _signInManager = signInManager;
        private readonly ITokenStore _tokenStore = tokenStore;

        public async Task<RegisterResult> RegisterUser(string username, string password)
        {

            IdentityUser user = new() { UserName = username };
            IdentityResult createResult = await _userManager.CreateAsync(user, password);

            if (!createResult.Succeeded)
            {
                return RegisterResult.Failure(AuthnServiceErrorCode.CreateResultUnsuccessful, createResult.Errors.Select(err => err.Description).ToArray());
            }

            return RegisterResult.Success(username);
        }

        public async Task<CreateSessionResult> CreateSession(string username, string password)
        {
            IdentityUser? user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return CreateSessionResult.Failure(AuthnServiceErrorCode.WrongUsernamePassword, None.Value);
            }

            bool valid = await _userManager.CheckPasswordAsync(user, password);
            if (!valid)
            {
                return CreateSessionResult.Failure(AuthnServiceErrorCode.WrongUsernamePassword, None.Value);
            }

            string token = await _tokenStore.CreateTokenAsync(username);

            return CreateSessionResult.Success(token);
        }

        public async Task<string?> GetUsernameFromToken(string token)
        {
            return await _tokenStore.GetUsernameByTokenAsync(token);
        }

        //public async Task DestroySessionByToken(string token)
        //{
        //    // To be implemented
        //}

        //public async Task DestroySessionsByUsername(string username)
        //{
        //    // To be implemented
        //}
    }

    public enum AuthnServiceErrorCode
    {
        CreateResultUnsuccessful,
        WrongUsernamePassword,
        InvalidToken
    }
}
