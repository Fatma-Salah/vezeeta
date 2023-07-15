using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.Repository.Docotr_Clinic;
using Vezeeta.DTO.Clinic_DoctorDTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Clinic_DoctorController : ControllerBase
    {
        private readonly IDoctor_Clinic Clinic_doctorRepos;

        public Clinic_DoctorController(IDoctor_Clinic _Clinic_doctorRepos)
        {
            Clinic_doctorRepos = _Clinic_doctorRepos;
        }

        // GET: api/Clinic_Doctor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clinic_Doctor>>> GetClinic_Doctors()
        {
            IEnumerable<Clinic_Doctor> clinics = await Clinic_doctorRepos.GetAll();
            if (clinics == null)
                return NotFound();
            return Ok(clinics);
        }

        // GET: api/Clinic_Doctor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Clinic_Doctor>>> GetClinic_Doctor(int id)
        {
            IEnumerable<Clinic_Doctor> clinics = await Clinic_doctorRepos.GetById(id);
            if (clinics == null)
                return NotFound("");
            return Ok(clinics);
        }

        //get clinic_doctor by Doctro id and clinic id 
        [HttpGet("{id}/{C_id}")]
        public async Task<ActionResult<Clinic_Doctor>> GetClinic_Doctor(int id, int C_id)
        {
            Clinic_Doctor clinic = await Clinic_doctorRepos.GetByDr_cl(id, C_id);
            if (clinic == null)
                return NotFound();
            return Ok(clinic);
        }


        // PUT: api/Clinic_Doctor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/{C_id}")]
        public async Task<IActionResult> PutClinic_Doctor(int id, int C_id, Clinics_DoctorDTO clinic_Doctor)
        {
            Clinic_Doctor oldClinic_Dr = await Clinic_doctorRepos.GetByDr_cl(id, C_id);
            if (oldClinic_Dr == null) return BadRequest();

            try
            {
                oldClinic_Dr.fees = clinic_Doctor.fees;
                await Clinic_doctorRepos.Update(oldClinic_Dr);
            }
            catch (DbUpdateException e) { return BadRequest(e.Message); }
            return Ok();
        }

        // POST: api/Clinic_Doctor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Clinic_Doctor>> PostClinic_Doctor(Clinics_DoctorDTO clinic_DoctorDTO)
        {
            if (clinic_DoctorDTO == null) return BadRequest();
            Clinic_Doctor clinic_Doctor = new Clinic_Doctor()
            {
                Dr_id = clinic_DoctorDTO.Dr_id,
                clinic_id = clinic_DoctorDTO.clinic_id,
                fees = clinic_DoctorDTO.fees,
            };
            Clinic_Doctor returnedFromRepo = await Clinic_doctorRepos.Add(clinic_Doctor);
            if (returnedFromRepo == null)
                return BadRequest();
            return Ok(returnedFromRepo);
        }

        // DELETE: api/Clinic_Doctor/5
        [HttpDelete("{id}/{C_id}")]
        public async Task<IActionResult> DeleteClinic_Doctor(int id, int C_id)
        {
            await Clinic_doctorRepos.DeleteById(id, C_id);
            return NoContent();
        }


    }
}
