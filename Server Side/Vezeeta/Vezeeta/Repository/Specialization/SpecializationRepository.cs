using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class SpecializationRepository:IEntityRepository<Specialization>
    {
        //fields
        VezeetaContext dbContext;

        //constructor
        public SpecializationRepository(VezeetaContext _dbContext)
        {
            dbContext = _dbContext;
        }


        //methods
        public async Task<Specialization> Add(Specialization spec)
        {
            await dbContext.AddAsync(spec);
            await dbContext.SaveChangesAsync();
            return spec;
        }

        public async Task DeleteById(int id)
        {
            var spec = await GetById(id);
            if (spec != null)
            {
                dbContext.Remove(spec);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Specialization>> GetAll()
        {
            return await dbContext.Specializations.ToListAsync();
        }

        public async Task<Specialization> GetById(int id)
        {
            return await dbContext.Specializations.Include(s => s.Questions).ThenInclude(q => q.Answers).ThenInclude(a => a.Dr).FirstOrDefaultAsync(spec => spec.id == id);
        }

        public async Task<Specialization> Update(int id, Specialization spec)
        {
            dbContext.Entry(spec).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return spec;
        }


    }
}
