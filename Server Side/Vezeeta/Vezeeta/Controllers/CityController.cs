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
using Vezeeta.DTO.CityDTO;

namespace Vezeeta.Controllers.NewFolder
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        IEntityRepository<City> _context;
        IEntityRepository<Region> _context_reigon;


        public CityController(IEntityRepository<City> context, IEntityRepository<Region> context_reigon)
        {
            _context = context;
            _context_reigon = context_reigon;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            IEnumerable<City> cities     = await _context.GetAll();

            if (cities == null)
          {
              return NotFound();
          }
            return Ok(cities);
        }

        // GET: api/Cities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            City? city = await _context.GetById(id);
            if (city == null) return NotFound();

    
            return Ok(city);
        }

        // PUT: api/Cities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCity(int id, CityDTO cityDTO)
        {
            //check if not found reigon database
            City city = await _context.GetById(id);
            if (city == null) return NotFound();
            if (id != cityDTO.id || cityDTO.region==0) return BadRequest();
            //check if entered reigon is founded
            var temp = await _context_reigon.GetById(cityDTO.region);
            if (temp == null) return BadRequest();

            try
            {
                city.name = cityDTO.name;
                city.region_id = temp.id;

                await _context.Update(id, city);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetCity(id) == null)
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Cities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<City>> PostCity(CityDTO cityDTO)
        {
            if (cityDTO == null) return BadRequest();
            try
            {
                ///check if reigon name is not founded
                var temp = await _context_reigon.GetById(cityDTO.region);
                if (temp == null) return BadRequest();


                City city = new City()
                {
                    name = cityDTO.name,
                    region_id = temp.id,
                };

                await _context.Add(city);
                return CreatedAtAction("GetCity", new { id = city.id }, city);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
           City? city = await _context.GetById(id);

            if (city == null) return NotFound();
            try
            {
                await _context.DeleteById(id);
                var response = new
                {
                    message = "Deleted Success",
                    city
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
