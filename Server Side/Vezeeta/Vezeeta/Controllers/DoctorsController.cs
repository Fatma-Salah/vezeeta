using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.DTO.DoctorDTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        IEntityRepository<Doctor> doctorRepository;
        IdoctorAdd byMail;
        public DoctorsController(IEntityRepository<Doctor> _doctorRepository, IdoctorAdd _byMail)
        {
            doctorRepository = _doctorRepository;
            byMail = _byMail;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            IEnumerable<Doctor> doctors = await doctorRepository.GetAll();
            if (doctors == null)
            {
                return NotFound();
            }
            return Ok(doctors);
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            Doctor doctor = await doctorRepository.GetById(id);
            if (doctor == null)
            {
                return NotFound();
            }
            return Ok(doctor);
        }

        // PUT: api/Doctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, DoctorDTO doctor)
        {
            if (doctor == null)
                return BadRequest();
            Doctor oldDr = await doctorRepository.GetById(id);
            if (oldDr == null)
                return BadRequest("no user");
            try
            {
                var getbyEmail = doctorRepository.GetAll().Result.FirstOrDefault(d => d.email == doctor.email);
                if (getbyEmail == null)
                    oldDr.email = doctor.email;
                else if (getbyEmail.email != oldDr.email)
                    return BadRequest("email found");

                oldDr.code = doctor.code;
                oldDr.password = doctor.password;
                oldDr.birth_date = doctor.birth_date;
                oldDr.name = doctor.name;
                oldDr.description = doctor.description;
                oldDr.id_specialize = doctor.id_specialize;
                oldDr.gender = doctor.gender;
                oldDr.waiting_time = doctor.waiting_time;
                oldDr.verification = doctor.verification;
                oldDr.experience = doctor.experience;
                oldDr.online_fees = doctor.online_fees;
                oldDr.image = doctor.image;
                
            }
            catch (DbUpdateException e) { return BadRequest(e.Message); }
            Doctor newDr = await doctorRepository.Update(id, oldDr);

            if (newDr != null)
                return Ok(doctor);
            return BadRequest();
        }

        // POST: api/Doctors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(DoctorDTO doctor)
        {
            if (doctor == null)
                return BadRequest("ddata is null");
            try
            {
                ICollection<Doctors_Phone> dr_phone = new HashSet<Doctors_Phone>();
                foreach (var item in doctor.Doctors_Phones)
                {
                    Doctors_Phone d = new Doctors_Phone()
                    {
                        phone = item.phone,
                    };
                    dr_phone.Add(d);
                }
                Doctor dr = new Doctor()
                {
                    id = doctor.id,
                    name = doctor.name,
                    email = doctor.email,
                    verification = doctor.verification,
                    image = doctor.image,
                    id_specialize = doctor.id_specialize,
                    waiting_time = doctor.waiting_time,
                    description = doctor.description,
                    password = doctor.password,
                    gender = doctor.gender,
                    experience = doctor.experience,
                    online_fees = doctor.online_fees,
                    Doctors_Phones = dr_phone,
                };
                await doctorRepository.Add(dr);
                return Ok(dr);
            }
               // Doctor oldDr = await doctorRepository.Add(dr);
               catch(Exception ex) { return BadRequest(ex.Message); }
            //if (oldDr != null)
            //    return Ok(dr);
            //return BadRequest();
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            await doctorRepository.DeleteById(id);
            return Ok();
        }

        [HttpGet("/api/Dr/{email}")]
        public async Task<IActionResult>getDoctorByMail(string email)
        {
            if(email==null)
                return BadRequest();
            var dr = await byMail.getByMail(email);
            if(dr != null) return Ok();
            return NoContent();
        }

    }
}
