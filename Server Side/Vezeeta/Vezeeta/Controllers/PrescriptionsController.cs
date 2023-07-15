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
using Vezeeta.DTO.Adding_DTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionsController : ControllerBase
    {
        private readonly IPrescription _context;

        public PrescriptionsController(IPrescription context)
        {
            _context = context;
        }

        // GET: api/Prescriptions
        [HttpGet]
        [Route("Doctor/{Dr_id}")]
        public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptionsByDoctor(int Dr_id)
        {
            IEnumerable<Prescription> prescriptions = await _context.GetAllByDoctor(Dr_id);
            if (prescriptions == null) return NotFound();

            return Ok(prescriptions);
        }
        [HttpGet]
        [Route("Patient/{patient_id}")]

        public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptionsByPatient(int patient_id)
        {
            IEnumerable<Prescription> prescriptions = await _context.GetAllByPatient(patient_id);
            if (prescriptions == null) return NotFound();

            return Ok(prescriptions);
        }

        // GET: api/Prescriptions/5
        [HttpGet("{Dr_id},{patient_id}")]
        public async Task<ActionResult<Prescription>> GetPrescription(int Dr_id, int patient_id)
        {
            if (Dr_id == 0 || patient_id == 0) return BadRequest();

            Prescription? ans = await _context.GetById(Dr_id,patient_id);
            if (ans == null) return NotFound();

            return Ok(ans);
        }

        // PUT: api/Prescriptions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{Dr_id},{patient_id}")]
        public async Task<IActionResult> PutPrescription(int Dr_id, int patient_id, AddPrescriptionDTO prescription)
        {
            Prescription? pres = await _context.GetById(Dr_id,patient_id);
            if (pres == null) return NotFound();
            if (Dr_id != pres.Dr_id || patient_id != pres.patient_id) return BadRequest();

            try
            {
                pres.description = prescription.description;
                pres.medicine = prescription.medicine;
                await _context.Update(Dr_id, patient_id, pres);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetPrescription(Dr_id, patient_id) == null)
                {
                    return NotFound();
                }
            }
            return AcceptedAtAction("GetPrescription", new { Dr_id = pres.Dr_id, patient_id = pres.patient_id }, pres);
        }

        // POST: api/Prescriptions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Prescription>> PostPrescription( AddPrescriptionDTO prescription)
        {
            if (prescription == null) return BadRequest();
            try
            {
                Prescription pres = new Prescription()
                {
                    Dr_id = prescription.Dr_id,
                    patient_id = prescription.patient_id,
                    description = prescription.description,
                    medicine = prescription.medicine
                };
                await _context.Add(pres);
                return CreatedAtAction("GetPrescription", new { Dr_id = pres.Dr_id, patient_id = pres.patient_id }, pres);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Prescriptions/5
        [HttpDelete("{Dr_id},{patient_id}")]
        public async Task<IActionResult> DeletePrescription(int Dr_id, int patient_id)
        {
            Prescription? pres = await _context.GetById(Dr_id,patient_id);

            if (pres == null) return NotFound();
            try
            {
                await _context.DeleteById(Dr_id,patient_id);
                var response = new
                {
                    message = "Deleted Success",
                    pres
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
