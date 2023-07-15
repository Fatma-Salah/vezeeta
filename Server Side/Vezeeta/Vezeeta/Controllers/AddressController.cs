using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using Vezeeta.DTO;
using Vezeeta.IEntities;
using Vezeeta.Models;
using Region = Vezeeta.Models.Region;

namespace Vezeeta.Controllers.NewFolder
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        IEntityRepository<Address> _context;
        IEntityRepository<City> _context_city;

        public AddressController(IEntityRepository<Address> context,IEntityRepository<City> mcity)
        {
            _context = context;
           
            _context_city= mcity;

        }

        // GET: api/Reigons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAdresses()
        {
            IEnumerable<Address> addresses = await _context.GetAll();
            if (addresses == null) return NotFound();

            return Ok(addresses);
        }

        // GET: api/Reigons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAdress(int id)
        {
            Address? address = await _context.GetById(id);
            if (address == null) return NotFound();
            
            return Ok(address);
        }





        // PUT: api/Reigons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(int id, AddressDTO adressDTO)
        {
            Address adress = await _context.GetById(id);
            if (adress == null) return NotFound();
            if (id != adressDTO.id) return BadRequest();

            try
            {
                var city =await _context_city.GetById(adressDTO.city_id);
            if (city==null) return BadRequest();

                adress.street = adressDTO.street;
                adress.square = adressDTO.square;
                adress.building = adressDTO.building;
                adress.floor_num = adressDTO.floor_num;
                adress.flat_num = adressDTO.flat_num;
                adress.notes = adressDTO.notes;
                adress.city_id = city.id;
                adress.clinic_id = adressDTO.clinic_id;

                await _context.Update(id, adress);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetAdress(id) == null)
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Reigons
        [HttpPost]
        public async Task<ActionResult<Address>> PostAdress(AddressDTO addressDTO)
        {
            if (addressDTO == null) return BadRequest();
            try
            {
                var city = await _context_city.GetById(addressDTO.city_id);
                if (city == null) return BadRequest();


                Address address = new Address()
                {
                street = addressDTO.street,
               square = addressDTO.square
               ,building = addressDTO.building
               ,floor_num = addressDTO.floor_num
               ,flat_num = addressDTO.flat_num
               ,notes = addressDTO.notes
               ,city_id = city.id
               ,clinic_id = addressDTO.clinic_id};
                await _context.Add(address);
                return CreatedAtAction("GetAdress", new { id = address.id }, address);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Reigons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteِAddress(int id)
        {
            Address? address = await _context.GetById(id);

            if (address == null) return NotFound();
            try
            {
                await _context.DeleteById(id);
                var response = new
                {
                    message = "Deleted Success",
                    address
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
