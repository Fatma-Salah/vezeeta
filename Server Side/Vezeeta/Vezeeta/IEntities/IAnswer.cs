using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IAnswer
    {
        public Task<IEnumerable<Answer>> GetAll(int Q_id);
        public Task<Answer> GetById(int Q_id,int Dr_id);
        public Task<Answer> Update(int Q_id, int Dr_id, Answer answer);
        public Task<Answer> DeleteById(int Q_id, int Dr_id);
        public Task<Answer> Add(Answer answer);
    }
}
