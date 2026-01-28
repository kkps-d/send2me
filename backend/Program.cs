
using backend.Auth;
using backend.Middlewares;
using backend.Services.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            string basePath = Environment.GetFolderPath(folder);
            string appIdentityDbPath = Path.Join(basePath, "appIdentity.db").ToString();
            string appDataDbPath = Path.Join(basePath, "appData.db").ToString();


            #region Dependency injection
            var builder = WebApplication.CreateBuilder(args);
            // Database
            builder.Services.AddDbContext<AppIdentityDbContext>(
                builderOptions =>
                {
                    builderOptions.UseSqlite($"Data Source={appIdentityDbPath}");
                }
            );
            // Auth
            builder.Services.AddAuthorization();
            builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                // Username-only setup
                options.User.RequireUniqueEmail = false;
                options.SignIn.RequireConfirmedAccount = false;

                // Relax password rules (optional)
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddDefaultTokenProviders();
            builder.Services.AddSingleton<ITokenStore, InMemoryTokenStore>();
            builder.Services.AddScoped<AuthnService>();
            // Route Controllers + Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer(); // Scans app for APIs and produces metadata
            builder.Services.AddSwaggerGen(); // Consumes above metadata to create openapi doc
            #endregion

            #region HTTP Request Pipeline
            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(); // adds endpoint to call the swaggergen service
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseMiddleware<TokenAuthenticationMiddleware>();
            app.UseAuthorization();
            app.MapControllers();
            #endregion

            app.Run();
        }
    }
}
