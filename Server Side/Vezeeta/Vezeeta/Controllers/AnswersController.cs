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
    public class AnswersController : ControllerBase
    {
        IAnswer _context;

        public AnswersController(IAnswer context)
        {
            _context = context;
        }

        // GET: api/Answers
        [HttpGet("{Q_id}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers(int Q_id)
        {
            IEnumerable<Answer> answers = await _context.GetAll(Q_id);
            if (answers == null) return NotFound();

            return Ok(answers);
        }

        // GET: api/Answers/5
        [HttpGet("{Q_id},{Dr_id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int Q_id, int Dr_id)
        {
            Answer? ans = await _context.GetById(Q_id,Dr_id);
            if (ans == null) return NotFound();

            return Ok(ans);
        }

        // PUT: api/Answers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{Q_id},{Dr_id}")]
        public async Task<ActionResult<Answer>> PutAnswer(int Q_id, int Dr_id, AddAnswerDTO answer)
        {
            Answer? a = await _context.GetById(Q_id,Dr_id);
            if (a == null) return NotFound();
            if (Q_id != a.Q_id || Dr_id != a.Dr_id) return BadRequest();

            try
            {
                a.description = answer.description;
                await _context.Update(Q_id, Dr_id, a);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetAnswer(Q_id,Dr_id) == null)
                {
                    return NotFound();
                }
            }
            return AcceptedAtAction("GetAnswer", new { Q_id = a.Q_id, Dr_id = a.Dr_id }, a);
        }

        // POST: api/Answers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer(AddAnswerDTO answer)
        {
            if (answer == null) return BadRequest();
            try
            {
                Answer a = new Answer()
                {
                  Q_id = answer.Q_id,
                  Dr_id = answer.Dr_id,
                  description = answer.description, 
                };
                await _context.Add(a);
                return CreatedAtAction("GetAnswer", new { Q_id = a.Q_id, Dr_id = a.Dr_id }, a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Answers/5
        [HttpDelete("{Q_id},{Dr_id}")]
        public async Task<IActionResult> DeleteAnswer(int Q_id, int Dr_id)
        {
            Answer? a = await _context.GetById(Q_id,Dr_id);

            if (a == null) return NotFound();
            try
            {
                await _context.DeleteById(Q_id,Dr_id);
                var response = new
                {
                    message = "Deleted Success",
                    a
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
