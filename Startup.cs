using Job.Helper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Services;
using System;

namespace Job
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<UserDatabaseSettings>(
              Configuration.GetSection(nameof(UserDatabaseSettings)));
            services.AddSingleton<IUserDatabaseSettings>(sp =>
             sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();

            services.Configure<CandidateDatabaseSettings>(
            Configuration.GetSection(nameof(CandidateDatabaseSettings)));
            services.AddSingleton<ICandidateDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CandidateDatabaseSettings>>().Value);
            services.AddSingleton<CandidateService>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
            services.AddControllers();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddScoped<IUserService, UserService>();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();


            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                {
                    if (env.IsDevelopment())
                    {
                        spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                }
            });
        }
    }
}
