using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class ReviewRepository: IReview
    {
         
     

            //fields
            VezeetaContext dbContext;

            //constructor
            public ReviewRepository(VezeetaContext context)
            {
                dbContext = context;
            }

            public async Task<Review> Add(Review entity)
            {
                await dbContext.AddAsync(entity);
                await dbContext.SaveChangesAsync();
                return entity;
            }

            public async Task<Review> DeleteById(int Dr_id, int patient_id)
            {
                Review? rev = await GetById(Dr_id,patient_id);
                if (rev != null)
                {
                    dbContext.Remove(rev);
                    await dbContext.SaveChangesAsync();
                    return rev;
                }
                return null;
            }

            public async Task<List<Review>> GetAllByDoctor(int Dr_id)
            {
                return await dbContext.Reviews.Include(a => a.Dr).Include(a=>a.patient).Where(r => r.Dr_id== Dr_id).ToListAsync();
            }

            public async Task<List<Review>> GetAllByPatient(int patient_id)
            {
                return await dbContext.Reviews.Include(a => a.Dr).Include(a => a.patient).Where(r => r.patient_id == patient_id).ToListAsync();
            }

            public async Task<Review> GetById(int Dr_id, int patient_id)
            {
                return  await dbContext.Reviews.Include(a => a.Dr).Include(a => a.patient).FirstOrDefaultAsync(a => a.Dr_id == Dr_id && a.patient_id == patient_id);
            }

            public async Task<Review> Update(int Dr_id, int patient_id, Review entity)
            {
                dbContext.Entry(entity).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();
                return entity;
            }
        }
    }

