using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class QuestionRepository : IEntityRepository<Question>
    {
        //fields
        VezeetaContext dbContext;

        //constructor
        public QuestionRepository(VezeetaContext context)
        {
            dbContext = context;
        }

        //methods
        public async Task<Question> Add(Question question)
        {
            await dbContext.AddAsync(question);
            await dbContext.SaveChangesAsync();
            return question;
        }

        public async Task DeleteById(int id)
        {
            var question = await GetById(id);
            if (question != null)
            {
                dbContext.Remove(question);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Question>> GetAll()
        {
            return await dbContext.Questions.ToListAsync();
        }

        public async Task<Question> GetById(int id)
        {
            return await dbContext.Questions.FirstOrDefaultAsync(q => q.id == id);
        }

        public async Task<Question> Update(int id, Question question)
        {
            dbContext.Entry(question).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return question;
        }
    }
}
