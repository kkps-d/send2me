
using backend.Auth;
using backend.Middlewares;
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


            /* Dependency Injection Section */

            var builder = WebApplication.CreateBuilder(args);

            // Database Contexts
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
            builder.Services.AddSingleton<Services.Auth.AuthTokenService>();

            // Route Controllers
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer(); // Scans app for APIs and produces metadata
            builder.Services.AddSwaggerGen(); // Consumes above metadata to create openapi doc


            /* Middleware Section */

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(); // adds endpoint to call the swaggergen service
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend API")); // serves the swagger ui, specified endpoint is the path of the generated openapi doc
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseMiddleware<TokenAuthenticationMiddleware>();
            app.MapControllers();

            app.Run();
        }
    }
}
