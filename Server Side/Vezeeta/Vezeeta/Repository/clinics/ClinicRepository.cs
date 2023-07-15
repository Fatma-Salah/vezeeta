using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository.clinics
{
    public class ClinicRepository:IEntityRepository<Clinic>,IClinic
    {
        #region fields
        private readonly VezeetaContext db;
        #endregion
        #region constructor
        public ClinicRepository(VezeetaContext _db)
        {
            db = _db;
        }
        #endregion

        public async Task<Clinic> Add(Clinic entity)
        {
            var PhoneIsExisted = await db.Clinics.FirstOrDefaultAsync(c => c.phone == entity.phone);
            if (PhoneIsExisted == null)
            {
                await db.AddAsync(entity);
                await db.SaveChangesAsync();
                return entity;
            }
            return null;
        }

        public async Task DeleteById(int id)
        {
            Clinic clinic = await db.Clinics.FirstOrDefaultAsync(c => c.id == id);
            if (clinic != null)
            {
                db.Remove<Clinic>(clinic);
                await db.SaveChangesAsync();
            }
        }

        public async Task<List<Clinic>> GetAll()
        {
            return await db.Clinics.ToListAsync();
        }

        public async Task<Clinic> GetById(int id)
        {
            return await db.Clinics.FirstOrDefaultAsync(c => c.id == id);
        }

        public async Task<Clinic> Update(int id, Clinic entity)
        {
            
                db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await db.SaveChangesAsync();
                return entity;
           
        }
        public async Task<Clinic_Doctor> getByDr(int id)
        {
            var cl = db.Clinic_Doctors.Include(d => d.clinic).ThenInclude(c => c.Address).ThenInclude(c=>c.city);
            foreach (var item in cl)
            {
                if (item.Dr_id == id)
                    return item;
            }
            return null;
        }
    }
}
