using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class AppointmentRepository : IAppointment
    {
        //fields
        VezeetaContext dbContext;

        //constructor
        public AppointmentRepository(VezeetaContext context)
        {
            dbContext = context;
        }

        //methods
        public async Task Add(Appointment appointment)
        {
            await dbContext.AddAsync(appointment);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteById(int id, int Dr_id)
        {
            Appointment? ans = await GetById(id, Dr_id);
            if (ans != null)
            {
                dbContext.Remove(ans);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<Appointment>> GetAll(int Dr_id)
        {
            var temp = await dbContext.Appointments.Include(a => a.Dr).Include(a => a.appoint).Where(a => a.Dr_id == Dr_id).ToListAsync();
         temp=temp.OrderBy(a=>a.start_date).ToList();
            temp = temp.Where(a => a.start_date >= DateTime.Now).ToList(); 
            return temp;

        }

        public async Task<Appointment> GetById(int id, int Dr_id)
        {
            return await dbContext.Appointments.Include(a => a.Dr).Include(a => a.appoint).FirstOrDefaultAsync(a => a.Dr_id == Dr_id && a.id == id);

        }

        public async Task Update(int id, int Dr_id, Appointment appointment)
        {
            Appointment? app = await GetById(id, Dr_id);
            if (app != null)
            {
                dbContext.Entry(appointment).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();
            }
        }

    }
}
