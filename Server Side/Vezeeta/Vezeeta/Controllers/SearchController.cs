using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vezeeta.DTO.SearchDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        ISearch search;
        public ValuesController(ISearch search)
        {
            this.search = search;

        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Doctor>>> Search(SearchDTO dto)
        {
            IEnumerable<Doctor> doctors = await search.GetAll(dto);
            if (doctors == null)
            {
                return NotFound();
            }
            return Ok(doctors);
        }

    }
}
