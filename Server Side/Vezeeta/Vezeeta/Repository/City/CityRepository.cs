using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository.Cities
{
    public class CityRepository : IEntityRepository<City>   {

        //fields
        VezeetaContext dbContext;

        //constructor
        public CityRepository(VezeetaContext context)
        {
            dbContext = context;
        }

        //methods
        public async Task<City> Add(City city)
        {
            await dbContext.AddAsync(city);
            await dbContext.SaveChangesAsync();
     return city;
        }

        public async Task DeleteById(int id)
        {
            var city = await GetById(id);
            if (city != null)
            {
                dbContext.Remove(city);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<City>> GetAll()
        {
            return await dbContext.Cities.ToListAsync();
        }

        public async Task<City> GetById(int id)
        {
            return await dbContext.Cities.Include(a=>a.region).FirstOrDefaultAsync(q => q.id == id);
        }

        //public async Task<City> GetByname(string  name)
        //{
        //    return await dbContext.Cities.FirstOrDefaultAsync(q => q.name == name);
        //}

        public async Task<City> Update(int id, City city)
        {
            dbContext.Entry(city).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        return city;
        }
    }
}
