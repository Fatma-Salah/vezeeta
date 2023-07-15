using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class AnswerRepository : IAnswer
    {
        //fields
        VezeetaContext dbContext;

        //constructor
        public AnswerRepository(VezeetaContext context)
        {
            dbContext = context;
        }

        //methods
        public async Task<Answer> Add(Answer answer)
        {
            await dbContext.AddAsync(answer);
            await dbContext.SaveChangesAsync();
            return answer;
        }

        public async Task<Answer> DeleteById(int Q_id, int Dr_id)
        {
            Answer? ans = await GetById(Q_id, Dr_id);
            if (ans != null)
            {
                dbContext.Remove(ans);
                await dbContext.SaveChangesAsync();
                return ans;
            }
            return null;
        }

        public async Task<IEnumerable<Answer>> GetAll(int Q_id)
        {
            return await dbContext.Answers.Include(a => a.Dr).Where(a => a.Q_id == Q_id).ToArrayAsync();
        }

        public async Task<Answer> GetById(int Q_id, int Dr_id)
        {
            return await dbContext.Answers.Include(a => a.Dr).FirstOrDefaultAsync(a => a.Q_id == Q_id && a.Dr_id == Dr_id);
        }

        public async Task<Answer> Update(int Q_id, int Dr_id, Answer answer)
        {
            Answer? ans = await GetById(Q_id, Dr_id);
            if (ans != null)
            {
                dbContext.Entry(answer).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();
                return ans;
            }
            return null;
        }

    }
}
