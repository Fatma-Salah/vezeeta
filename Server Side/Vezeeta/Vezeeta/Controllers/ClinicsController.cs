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
using Vezeeta.DTO.ClinicDTO;
using Vezeeta.Repository.clinics;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicsController : ControllerBase
    {
        private readonly IEntityRepository<Clinic> ClinicRepos;
        private readonly IClinic getDrRepo;

        public ClinicsController(IEntityRepository<Clinic> _ClinicRepos, IClinic _getDrRepo)
        {
            ClinicRepos = _ClinicRepos;
            getDrRepo= _getDrRepo;
        }

        // GET: api/Clinics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clinic>>> GetClinics()
        {
            List<Clinic> clinics = await ClinicRepos.GetAll();
            if (clinics == null)
            {
                return NotFound();
            }
            return Ok(clinics);
        }

        // GET: api/Clinics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clinic>> GetClinic(int id)
        {
            Clinic clinic = await ClinicRepos.GetById(id);
            if (clinic == null)
            {
                return BadRequest();
            }
            return Ok(clinic);
        }

        // PUT: api/Clinics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClinic(int id, ClinicUpdateDTO clinic)
        {
            Clinic ReturnedClinic;
            Clinic oldClinic = await ClinicRepos.GetById(id);
            //ICollection<Clinic_Doctor> cl_dr = new List<Clinic_Doctor>();
            //foreach (var cllinicDr in clinic.Clinic_Doctors)
            //{
            //    Clinic_Doctor c = new Clinic_Doctor()
            //    {
            //        Dr_id = cllinicDr.Dr_id,
            //        clinic_id = cllinicDr.clinic_id,
            //    };
            //    cl_dr.Add(c);
            //}
            //Address Address = new Address();
            //{
            //    Address.building = clinic.Address.building;
            //    Address.street = clinic.Address.street;
            //    Address.notes = clinic.Address.notes;
            //    Address.flat_num = clinic.Address.flat_num;
            //    Address.floor_num = clinic.Address.floor_num;
            //    Address.square = clinic.Address.square;
            //    Address.city_id = clinic.Address.city_id;
            //}
            
            if (oldClinic == null) { return BadRequest(); }
            try
            {
                oldClinic.name = clinic.name;
                oldClinic.phone = clinic.phone;
                //oldClinic.Clinic_Doctors = cl_dr;
               // oldClinic.Address = Address;
                ReturnedClinic = await ClinicRepos.Update(id, oldClinic);
            }
            catch (DbUpdateException e)
            {
                return BadRequest(e.Message);
            }
            if (ReturnedClinic == null) { return BadRequest("null"); }
            return Ok(ReturnedClinic);

        }

        // POST: api/Clinics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Clinic>> PostClinic(ClinicDTO clinicDTO)
        {
            if (clinicDTO == null) return BadRequest("null");
            ICollection<Clinic_Doctor>cl_dr=new HashSet<Clinic_Doctor>();
            try
            {
                foreach (var cllinicDr in clinicDTO.Clinic_Doctors)
                {
                    Clinic_Doctor c = new Clinic_Doctor()
                    {
                        Dr_id = cllinicDr.Dr_id,
                        clinic_id = cllinicDr.clinic_id,
                    };
                    cl_dr.Add(c);
                }
                Address Address = new Address();
                {
                    Address.building = clinicDTO.Address.building;
                    Address.street = clinicDTO.Address.street;
                    Address.notes = clinicDTO.Address.notes;
                    Address.flat_num = clinicDTO.Address.flat_num;
                    Address.floor_num = clinicDTO.Address.floor_num;
                    Address.square = clinicDTO.Address.square;
                    Address.city_id = clinicDTO.Address.city_id;
                }
                Clinic clinic = new Clinic()
                {
                    id = clinicDTO.id,
                    name = clinicDTO.name,
                    phone = clinicDTO.phone,
                    Clinic_Doctors = cl_dr,
                    Address = Address,
                };
                Clinic returnedClinic = await ClinicRepos.Add(clinic);
                return Ok(returnedClinic);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
            //if (returnedClinic == null)
            //    return BadRequest();
            //return Ok(returnedClinic);

        }

        // DELETE: api/Clinics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClinic(int id)
        {
            await ClinicRepos.DeleteById(id);
            return NoContent();
        }

        [HttpGet("/api/Dr_clinic/{D_id}") ]
        public async Task<IActionResult> getByDr(int D_id)
        {
            var cl = await getDrRepo.getByDr(D_id);
            if (cl != null)
            {
                return Ok(cl);
            }
            return NoContent();
        }

    }
}
