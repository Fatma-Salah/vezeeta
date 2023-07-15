using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IEntityRepository<t>
    {
        public Task<List<t>> GetAll();
        public Task<t> GetById(int id);
        public Task<t> Update(int id, t entity);
        public Task DeleteById(int id);
        public Task<t> Add(t entity);
             
        //public Task<t> GetByMail(string mail);
    }
}
