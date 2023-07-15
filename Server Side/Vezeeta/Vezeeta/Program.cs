using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Vezeeta.Auth;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;
using Vezeeta.Repository;
using Vezeeta.Repository.Adress;
using Vezeeta.Repository.Cities;
using Vezeeta.Repository.clinics;
using Vezeeta.Repository.Docotr_Clinic;
using Vezeeta.Repository.doctor;
using Vezeeta.Repository.doctor_phones;
using Vezeeta.Repository;
using Vezeeta.Repository.Reigon;



namespace Vezeeta
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            #endregion

            #region Json Serializer //cause we don't need to make DTOs for getting 
            builder.Services.AddMvc()
                .AddJsonOptions(option =>
                {
                    option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });
            #endregion

            #region db Connection
            // Add services to the container.

            builder.Services.AddDbContext<VezeetaContext>(db =>
            db.UseSqlServer(
                builder.Configuration.GetConnectionString("conn")
                )
            );
            #endregion

            #region JWT
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = "Jwt:Audience",
                    ValidIssuer ="Jwt:Issuer",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Jwt:Key to this token for vezeeta project")),
                    RoleClaimType = ClaimTypes.Role,

                };
            });

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin",
                    policy => policy.RequireClaim("Admin"));
                options.AddPolicy("Patient",
                    policy => policy.RequireRole("Patient"));
                options.AddPolicy("Doctor", policy =>
                {
                    policy.RequireRole("Doctor");
                });
            });
            #region JWT DI
            builder.Services.AddScoped<IJWT,JWTRepository>();
            builder.Services.AddScoped<IAuthentication<Admin>, AdminRepository>();
            builder.Services.AddScoped<IAuthentication<Doctor>, DoctorRepository>();
            builder.Services.AddScoped<IAuthentication<Patient>, patientRepo>();

            //services of patient and doctor

            #endregion

            #endregion

            #region DI

            builder.Services.AddScoped<IEntityRepository<Doctor>, DoctorRepository>();
            builder.Services.AddScoped<IDoctor_phones, Doctor_phonesRepository>();
            builder.Services.AddScoped<IEntityRepository<Clinic>, ClinicRepository>();
            builder.Services.AddScoped<IDoctor_Clinic, Doctor_clinicRepository>();
            builder.Services.AddScoped<IAnswer, AnswerRepository>();
            builder.Services.AddScoped<IAppointment, AppointmentRepository>();
            builder.Services.AddScoped<IReview, ReviewRepository>();
            builder.Services.AddScoped<IEntityRepository<Patient>, patientRepo>();
            builder.Services.AddScoped<IUpdateAccountRepo<Patient>, patientRepo>();
            builder.Services.AddScoped<IPatientAppiont, patientAppointRepo>();
            builder.Services.AddScoped<IPrescription, PrescriptionRepository>();
            builder.Services.AddScoped<IEntityRepository<Question>, QuestionRepository>();
            builder.Services.AddScoped<IEntityRepository<Specialization>, SpecializationRepository>();
            builder.Services.AddScoped<IEntityRepository<Region>, ReigonRepository>();
            builder.Services.AddScoped<IEntityRepository<City>, CityRepository>();
            builder.Services.AddScoped<IEntityRepository<Address>, AdressRepository>();
            builder.Services.AddScoped<ISearch, SearchReposatory>();
            builder.Services.AddScoped<IdoctorAdd,DoctorRepository>();
            builder.Services.AddScoped<IClinic,ClinicRepository>();
            builder.Services.AddScoped<IPatientQuetions, patientRepo>();

            #endregion

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
 
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Vezeeta");
                c.RoutePrefix = string.Empty;
            });

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();


            app.MapControllers();
            app.UseCors("AllowAll");

            app.Run();
        }
    }
}