using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.DTO.patientDTO;
using System.Xml.Linq;
using Vezeeta.IEntities;
using System.Security.Cryptography;
using Vezeeta.Repository.doctor;
using System.Numerics;
using System.Globalization;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IEntityRepository<Patient> context;
        private readonly IUpdateAccountRepo<Patient> contextUpdat;
        IPatientQuetions pqcontext;

        public PatientsController(IEntityRepository<Patient> _context , IUpdateAccountRepo<Patient> _contextUpdat, IPatientQuetions _pqcontext)
        {
            context = _context;
            contextUpdat = _contextUpdat;
            pqcontext = _pqcontext;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
          if (context == null)
          {
              return NotFound();
          }
          return await context.GetAll();
           
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            Patient? patient = await context.GetById(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updatePatient(int id, addPatientDTO patientdto)
        {
            if (patientdto == null)
                return BadRequest("لايوجد مستخدم للتعديل على بياناته");  
           
            Patient p = await context.GetById(id);
            if (p==null) return BadRequest("المستخدم غير موجود بقاعدة البيانات");
           // if (p.id != id) return NotFound();
            try {
                p.name = patientdto.patientName; 

                if (await contextUpdat.GetByPhone(patientdto.patientPhone) == null)
                {
                    p.phone = patientdto.patientPhone;
                }
                if (await contextUpdat.GetByMail(patientdto.patientEmail) == null ) 
                {
                    p.email = patientdto.patientEmail;
                }
                
                p.birth_date = patientdto.patientBirth_date;
                p.gender = patientdto.patientGender;
                p.address=patientdto.patientAddress;
                p.code = patientdto.patientCode;
                p.password=patientdto.patientPassword;
                p.update_at = DateTime.ParseExact(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                Patient patientUpdate = await context.Update(id, p); 

                if (patientUpdate != null)
                    return Ok(p);
                return BadRequest("عفوا ,حدثت مشكله اثنائ تحديث البيانات ,من فضلك حاول في وقت لاحق ");
            }
            catch (Exception e) { return BadRequest(e.Message); }
        
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> addPatient(addPatientDTO patientDTO)
        {
            if (patientDTO == null)
            {
                return BadRequest();
            }
            try
            {
                // Hash the password 
         //  var hashedPassword =  contextUpdat.HashPassword(patientDTO.patientPassword);

                Patient p = new Patient() { 
                    name = patientDTO.patientName,
                    gender = patientDTO.patientGender,
                    email = patientDTO.patientEmail,
                    phone = patientDTO.patientPhone,
                    birth_date = patientDTO.patientBirth_date,
                    address = patientDTO.patientAddress,
                  password=patientDTO.patientPassword,
                    //  password = hashedPassword,
                };
                bool phoneValidate = await contextUpdat.phoneValidation(p.phone);
                var mailIsFound = await contextUpdat.GetByMail(p.email);
                var phoneIsFound = await contextUpdat.GetByPhone(p.phone);
                if (phoneValidate && mailIsFound == null && phoneIsFound == null)
                {
                        await context.Add(p);
                        return CreatedAtAction("GetPatient", new { id = p.id }, p);

                }else
                {
                if(phoneValidate == false)
                          return BadRequest(" الرقم الموبايل غير صالح ,من فضلك ادخل رقم صحيح");
                    if (phoneIsFound != null)
                        return BadRequest(" رقم  الموبايل موجود بالفعل ");
                //if (mailmailIsFound != null)
                    return BadRequest("  البريد الإلكتروني موجود بالفعل");
                   // return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


     

        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeletePatient(int id)
        { 
                await context.DeleteById(id);
                return Ok();
          
        }


        [HttpPost("{password}")]
        public async Task<ActionResult<Patient>> LoginPatient(patientLoginDTO userLog)
        { 
           // string LoginPasswordAfterHash = contextUpdat.HashPassword(userLog.Password);

            Patient patientByMail = await contextUpdat.GetByMail(userLog.Email);
            Patient patientByPhone = await contextUpdat.GetByPhone(userLog.Phone);

            if (patientByMail != null || patientByPhone != null) // login by mail or phone  
            {

                if (patientByMail != null && patientByMail.password ==userLog.Password)
                    return Ok();

                if (patientByPhone != null && patientByPhone.password == userLog.Password)

                    return Ok();
                return BadRequest("كلمة المرور غير صحيحة");
            }
            else
                return BadRequest("البريد الإلكتروني او رقم الموبايل غير صحيح ");
              
        }

        [HttpGet]
        [Route("Questions/{id}")]
        public async Task<ActionResult<Patient>> GetPatientWithQuestions(int id)
        {
            Patient? patient = await pqcontext.GetPatientWithQuetions(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }
        [HttpGet("{email}")]
        public async Task<ActionResult<Patient>> GetPatientByMail(string email)
        {
            Patient? patient = await contextUpdat.GetByMail(email);
            if (patient == null)
            {
                return NotFound(" لم نتمكن من العثور على حسابك بإستخدام هذا البريد الإلكتروني");
            }
            return Ok(patient);
        }

    }
}
