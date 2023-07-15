using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.Repository.doctor_phones;
using Vezeeta.DTO.Doctor_phones_DTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Doctors_PhoneController : ControllerBase
    {
        IDoctor_phones doctor_phoneRepository;

        public Doctors_PhoneController(IDoctor_phones _doctor_phoneRepository)
        {
            doctor_phoneRepository = _doctor_phoneRepository;
        }


        // GET: api/Doctors_Phone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctors_Phone>>> GetDoctors_Phones()
        {
            var allDrsPhones = await doctor_phoneRepository.GetAll();
            if (allDrsPhones == null)
            {
                return BadRequest("no data");
            }
            return allDrsPhones;
        }

        // GET: api/Doctors_Phone/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Doctors_Phone>>> GetDoctor_Phones(int id)
        {
            var allDrPhones = await doctor_phoneRepository.GetById(id);
            if (allDrPhones == null)
            {
                return NotFound();
            }


            return Ok(allDrPhones);
        }

        //PUT: api/Doctors_Phone/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}/{phone}")]
        //public async Task<IActionResult> PutDoctors_Phone(int id, string phone, Doctor_PhonesDTO entity)
        //{
        //    var oldPhone = await doctor_phoneRepository.GetByPhone(id, phone);
        //    if (oldPhone==null)
        //    {
        //        return BadRequest();
        //    }



        //    try
        //    {
        //        oldPhone.phone=entity.phone;
        //        await doctor_phoneRepository.Update(id, oldPhone);
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //       return NoContent();
        //    }

        //    return NoContent();
        //}


        // POST: api/Doctors_Phone
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Doctors_Phone>> PostDoctors_Phone(Doctor_PhonesDTO dr)
        {
            if (dr == null) return BadRequest();
            Doctors_Phone doctors_Phone = new Doctors_Phone()
            {
                Dr_id = dr.Dr_id,
                phone = dr.phone
            };
            Doctors_Phone DrPhone = await doctor_phoneRepository.Add(doctors_Phone);
            if (DrPhone == null)
            {
                return BadRequest();
            }
            return Ok(DrPhone);

        }

        // DELETE: api/Doctors_Phone/5
        [HttpDelete("{id}/{phone}")]
        public async Task<IActionResult> DeleteDoctors_Phone(int id, string phone)
        {
            await doctor_phoneRepository.DeleteById(id, phone);
            return NoContent();
        }
        [HttpGet("/api/Dr_phone/{phone}")]
        public async Task<IActionResult> getDrByPhone(string phone)
        {
            if (phone == null)
            {
                return BadRequest();
            }
            var dr_phone =await doctor_phoneRepository.getByPhoneIsExist(phone);
            if (dr_phone == null)
                return NoContent();
            return Ok();
        }

    }
}
