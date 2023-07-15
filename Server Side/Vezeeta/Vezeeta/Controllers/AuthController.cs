using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Vezeeta.Auth;
using Vezeeta.IEntities;
using Microsoft.Extensions.Configuration;
using Vezeeta.Models;

namespace Vezeeta.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Fields
        readonly IJWT _jwt;
        readonly IAuthentication<Admin> _authentication;
        readonly IAuthentication<Doctor> _DoctorAuthentication;
        readonly IAuthentication<Patient> _PatientAuthentication;
        #endregion

        #region Constructor
        public AuthController(IJWT jWT, IAuthentication<Admin> authentication, IAuthentication<Doctor> DoctorAuthentication, IAuthentication<Patient> patientAuthentication)
        {
            _jwt = jWT;
            _authentication = authentication;
            _DoctorAuthentication = DoctorAuthentication;
            _PatientAuthentication = patientAuthentication;
        }
        #endregion

        #region Methods
        [HttpPost("admin")]
        public async Task<ActionResult> Login(LogInDTO login)
        {


            #region Check Parameters 
            var EmptyParametersObj = new
            {
                StatusCode = 400,
                message = "Empty Parameters",
            };
            if (login.email == null || login.password == null) return BadRequest(EmptyParametersObj);
            #endregion

            Admin? admin = await _authentication.Login(login);

            #region Check is Existed
            var InvalidCredentialObj = new
            {
                StatusCode = 400,
                message = "Invalid Credential",
            };

            if (admin == null)
                return BadRequest(InvalidCredentialObj);
            #endregion

            #region Define Claims
            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(type: "name", value: admin.email),
                new Claim(ClaimTypes.Role , "Admin")
            };
            #endregion

            #region Response Formatter
            var response = new
            {

                StatusCode = 200,
                message = "Login successful",
                response = new
                {
                    token = _jwt.GenerateToken(claims),
                    role = "Admin",
                    admin = new
                    {
                        email = admin.email,
                    }
                }

            };
            #endregion

            return Ok(response);
        }

        [HttpPost("Doctor")]
        public async Task<ActionResult> Doctor_Login(LogInDTO login)
        {
            #region objects for bad request 
            var EmptyParametersObj = new
            {
                StatusCode = 400,
                message = "Empty Parameters",
            };
            var InvalidDoctorEmail_OR_Pass = new
            {
                StatusCode = 400,
                message = "invalid email or password",
            };

            #endregion


            if (login == null) return BadRequest(EmptyParametersObj);

            var doctor = await _DoctorAuthentication.Login(login);
            if (doctor == null) return BadRequest(InvalidDoctorEmail_OR_Pass);

            #region claims
            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(type: "name", value: doctor.email),
                new Claim(ClaimTypes.Role , "Doctor")
            };
            #endregion

            #region response 
            var response = new
            {

                StatusCode = 200,
                message = "Login successful",
                response = new
                {
                    token = _jwt.GenerateToken(claims),
                    role = "Doctor",
                    doctor = new
                    {
                        id = doctor.id,
                        name = doctor.name,

                    }
                }

            };
            #endregion

            return Ok(response);

        }
        [HttpPost("Patient")]
        public async Task<ActionResult> Patient_Login(LogInDTO login)
        {
            #region objects for bad request 
            var EmptyParametersObj = new
            {
                StatusCode = 400,
                message = "Empty Parameters",
            };
            var InvalidDoctorEmail_OR_Pass = new
            {
                StatusCode = 400,
                message = "invalid email or password",
            };

            #endregion


            if (login == null) return BadRequest(EmptyParametersObj);

            var patient = await _PatientAuthentication.Login(login);
            if (patient == null) return BadRequest(InvalidDoctorEmail_OR_Pass);

            #region claims
            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(type: "name", value: patient.email),
                new Claim(ClaimTypes.Role , "Patient")
            };
            #endregion

            #region response 
            var response = new
            {

                StatusCode = 200,
                message = "Login successful",
                response = new
                {
                    token = _jwt.GenerateToken(claims),
                    role = "Patient",
                    patient = new
                    {
                        id = patient.id,
                        name = patient.name,
                    }
                }

            };
            #endregion

            return Ok(response);

        }

        #endregion
    }
}
