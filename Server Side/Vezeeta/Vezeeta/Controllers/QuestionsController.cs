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
    public class QuestionsController : ControllerBase
    {
        IEntityRepository<Question> _context;

        public QuestionsController(IEntityRepository<Question> context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            IEnumerable<Question> questions = await _context.GetAll();
            if (questions == null) return NotFound();

            return Ok(questions);
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            Question? spec = await _context.GetById(id);
            if (spec == null) return NotFound();

            return Ok(spec);
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, AddQuestionDTO question)
        {
            Question q = await _context.GetById(id);
            if (q == null) return NotFound();
            if (id != question.id) return BadRequest();

            try
            {
                q.title = question.title;
                q.description = question.description;
                q.age = question.age;
                q.type = question.type;
                q.gender = question.gender;
                q.spec_id = question.spec_id;
                q.patient_id = question.patient_id;
                await _context.Update(id, q);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetQuestion(id) == null)
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(AddQuestionDTO question)
        {
            if (question == null) return BadRequest();
            try
            {
                Question q = new Question()
                {
                    title = question.title,
                    description = question.description,
                    age = question.age,
                    type = question.type,
                    gender = question.gender,
                    spec_id = question.spec_id,
                    patient_id = question.patient_id,
                };
                await _context.Add(q);
                return CreatedAtAction("GetQuestion", new { id = q.id }, q);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            Question? q = await _context.GetById(id);

            if (q == null) return NotFound();
            try
            {
                await _context.DeleteById(id);
                var response = new
                {
                    message = "Deleted Success",
                    q
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
