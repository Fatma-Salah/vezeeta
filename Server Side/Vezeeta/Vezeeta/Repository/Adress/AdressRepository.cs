using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository.Adress
{
    public class AdressRepository : IEntityRepository<Address>
    {
        //fields
        VezeetaContext dbContext;

        //constructor
        public AdressRepository(VezeetaContext context)
        {
            dbContext = context;
        }

        //methods
        public async Task<Address> Add(Address address)
        {
            await dbContext.AddAsync(address);
            await dbContext.SaveChangesAsync();
            return address;
        }

        public async Task DeleteById(int id)
        {
            var address = await GetById(id);
            if (address != null)
            {
                dbContext.Remove(address);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Address>> GetAll()
        {
            return await dbContext.Addresses.ToListAsync();
        }

        public async Task<Address> GetById(int id)
        {
            return await dbContext.Addresses.Include(a=>a.city).ThenInclude(a=>a.region).FirstOrDefaultAsync(q => q.id == id);
        }

        public async Task<Address> Update(int id, Address address)
        {
            dbContext.Entry(address).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return address;
        }
    }
}
