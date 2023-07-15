using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository.Reigon
{
    public class ReigonRepository : IEntityRepository<Region>
    {
      
            //fields
            VezeetaContext dbContext;

            //constructor
            public ReigonRepository(VezeetaContext context)
            {
                dbContext = context;
            }

            //methods
            

            public async Task DeleteById(int id)
            {
                var region = await GetById(id);
                if (region != null)
                {
                    dbContext.Remove(region);
                    await dbContext.SaveChangesAsync();
                }
            }

            public async Task<List<Region>> GetAll()
            {
                return await dbContext.Regions.Include(a => a.Cities).ToListAsync();
            }

            public async Task<Region> GetById(int id)
            {
                return await dbContext.Regions.Include(a=>a.Cities).FirstOrDefaultAsync(q => q.id == id);
            }

            //public async Task<Region> GetByname(string name)
            // {
            //return await dbContext.Regions.Include(a => a.Cities).FirstOrDefaultAsync(q => q.name == name);
            //}

          public async Task<Region> Add(Region region)
            {
            await dbContext.AddAsync(region);
            await dbContext.SaveChangesAsync();
            return region;
            }

         public async Task<Region> Update(int id, Region region)
         {
            dbContext.Entry(region).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return region;
         }
    
    }
    }

