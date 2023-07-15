using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationsController : ControllerBase
    {
        //fields
        private readonly IEntityRepository<Specialization> _context;

        //constructor
        public SpecializationsController(IEntityRepository<Specialization> context)
        {
            _context = context;
        }

        // GET: api/Specializations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations()
        {
            IEnumerable<Specialization> specs = await _context.GetAll();
            if (specs == null) return NotFound();

            return Ok(specs);
        }

        // GET: api/Specializations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Specialization>> GetSpecialization(int id)
        {
            Specialization? spec = await _context.GetById(id);
            if (spec == null) return NotFound();

            return Ok(spec);
        }

        // PUT: api/Specializations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecialization(int id, Specialization specialization)
        {
            Specialization spec = await _context.GetById(id);
            if (spec == null) return NotFound();
            if (id != specialization.id) return BadRequest();

            try
            {
                spec.name = specialization.name;

                await _context.Update(id, spec);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetSpecialization(id) == null)
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Specializations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Specialization>> PostSpecialization(Specialization specialization)
        {

            if (specialization == null) return BadRequest();
            try
            {
                await _context.Add(specialization);
                return CreatedAtAction("GetSpecialization", new { id = specialization.id }, specialization);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Specializations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialization(int id)
        {
            Specialization? spec = await _context.GetById(id);

            if (spec == null) return NotFound();
            try
            {
                await _context.DeleteById(id);
                var response = new
                {
                    message = "Deleted Success",
                    spec
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
