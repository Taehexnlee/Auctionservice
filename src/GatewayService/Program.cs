using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var authority = builder.Configuration["IdentityServiceUrl"]; // internal http endpoint
var issuer = builder.Configuration["IdentityIssuer"] ?? authority; // external issuer used in tokens

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = authority;
        options.RequireHttpsMetadata = false;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,

            ValidIssuer = issuer,

            NameClaimType = "username"
        };
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy", b =>
    {
        b.AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials()
         .WithOrigins(
           builder.Configuration["ClientApp"]
         );
    });
});
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AuctionScopePolicy", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("scope", "auctionApp");
    });
var app = builder.Build();

app.UseCors("customPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapReverseProxy();

app.Run();
