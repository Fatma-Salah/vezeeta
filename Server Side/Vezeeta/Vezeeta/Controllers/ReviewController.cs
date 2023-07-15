using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        IReview _context;

        public ReviewController(IReview context)
        {
            _context = context;
        }
        [HttpGet]
        [Route(template:"{Dr_id},{patient_id}")]
        public async Task<ActionResult<Review>> GetReviewsByDoctorBypatient(int Dr_id, int patient_id)
        {
            Review? pre = await _context.GetById(Dr_id, patient_id);
            if (pre == null) return NotFound();

            return Ok(pre);
        }
        // GET: api/Reviews/4
        [HttpGet]
        [Route(template: "patient/{patient_id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsByPatient(int patient_id)
        {
            IEnumerable<Review> reviews = await _context.GetAllByPatient(patient_id);
            if (reviews == null) return NotFound();

            return Ok(reviews);
        }
        // GET: api/Reviews/5
        [HttpGet]
        [Route(template:"Doctor/{Dr_id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsByDoctor(int Dr_id)
        {
            IEnumerable<Review> reviews = await _context.GetAllByDoctor(Dr_id);
            if (reviews == null) return NotFound();

            return Ok(reviews);
        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{Dr_id},{patient_id}")]
        public async Task<IActionResult> PutReview(int dr_id, int patient_id, Review review)
        {
            Review r = await _context.GetById(dr_id, patient_id);
            if (r == null) return NotFound();
            if (dr_id != review.Dr_id || patient_id != review.patient_id) return BadRequest();

            try
            {
                r.value = review.value;
                r.comment = review.comment;
                r.created_at = review.created_at;
                r.updated_at = review.updated_at;

                await _context.Update(dr_id, patient_id, r);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetReviewsByDoctorBypatient(dr_id, patient_id) == null)
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            if (review == null) return BadRequest();
            try
            {
                Review r = new Review()
                {
                    value = review.value,
                    comment = review.comment,
                    created_at = review.created_at,
                    updated_at = review.updated_at

                };
                await _context.Add(r);
                return CreatedAtAction("GetReview", new { Dr_id = r.Dr_id, patient_id = r.patient_id }, r);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{Dr_id},{patient_id}")]
        public async Task<IActionResult> DeleteReview(int Dr_id, int patient_id)
        {
            Review? r = await _context.GetById(Dr_id, patient_id);

            if (r == null) return NotFound();
            try
            {
                await _context.DeleteById(Dr_id, patient_id);
                var response = new
                {
                    message = "Deleted Success",
                    r
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
