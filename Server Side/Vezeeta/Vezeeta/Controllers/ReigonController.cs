using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.DTO.RegionDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Controllers.NewFolder
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReigonsController : ControllerBase
    {
        IEntityRepository<Region> _context;

        public ReigonsController(IEntityRepository<Region> context)
        {
            _context = context;
        }

        // GET: api/Reigons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Region>>> GetReigons()
        {
            IEnumerable<Region> reigons = await _context.GetAll();
            if (reigons == null) return NotFound();

            return Ok(reigons);
        }

        // GET: api/Reigons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Region>> GetReigon(int id)
        {
            Region? region = await _context.GetById(id);
            if (region == null) return NotFound();

            //GetReigonDTO dto=new GetReigonDTO();
            //dto.name = region.name;
            //dto.status= region.status;
            //dto.id = id;

            //var list=new List<string>();
            //foreach (var item in region.Cities)
            //{
            //    list.Add(item.name);
            //}

            //dto.Cities=list;
            return Ok(region);
        }





        // PUT: api/Reigons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReigon(int id,RegionDTO reigonDTO)
        {
            Region region = await _context.GetById(id);
            if (region == null) return NotFound();
            if (id != reigonDTO.id) return BadRequest();

            try
            {
               region.name = reigonDTO.name;
              
                await _context.Update(id, region);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetReigon(id) == null)
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Reigons
        [HttpPost]
        public async Task<ActionResult<Region>> PostReigon(RegionDTO reigonDTO)
        {
            if (reigonDTO == null) return BadRequest();
            try
            {
                Region region = new Region()
                {
                   name= reigonDTO.name,
                };
                await _context.Add(region);
                return CreatedAtAction("GetReigon", new { id = region.id }, region);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Reigons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReigon(int id)
        {
          Region? region = await _context.GetById(id);

            if (region == null) return NotFound();
            try
            {
                await _context.DeleteById(id);
                var response = new
                {
                    message = "Deleted Success",
                    region
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
