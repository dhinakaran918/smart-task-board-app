using Microsoft.EntityFrameworkCore;
using TaskBoardAPI.Data;
using TaskBoardAPI.Repositories;
using TaskBoardAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// DB Connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// CORS — allow React dev server (ports 3000, 3002, 5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:3002",   // your actual React port
                "http://localhost:5173"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowReact"); // must be before UseAuthorization

app.UseAuthorization();

app.MapControllers();

app.Run();
