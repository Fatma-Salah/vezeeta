using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.Models;

namespace Vezeeta.Repository.Docotr_Clinic
{
    public class Doctor_clinicRepository:IDoctor_Clinic
    {
        #region fields
        private readonly VezeetaContext db;
        #endregion
        #region constructor
        public Doctor_clinicRepository(VezeetaContext _db)
        {
            db = _db;
        }
        #endregion

        public async Task<Clinic_Doctor> Add(Clinic_Doctor entity)
        {
            Clinic_Doctor oldDrCl = await db.Clinic_Doctors.FirstOrDefaultAsync(dc => dc.Dr_id == entity.Dr_id && dc.clinic_id == entity.clinic_id);
            if (oldDrCl == null)
            {
                await db.AddAsync(entity);
                await db.SaveChangesAsync();
                return entity;
            }
            return null;

        }

        public async Task DeleteById(int Dr_id, int C_id)
        {
            Clinic_Doctor oldDrCl = await db.Clinic_Doctors.FirstOrDefaultAsync(dc => dc.Dr_id == Dr_id && dc.clinic_id == C_id);
            if (oldDrCl != null)
            {
                db.Remove(oldDrCl);
                await db.SaveChangesAsync();
            }

        }

        public async Task<List<Clinic_Doctor>> GetAll()
        {
            return await db.Clinic_Doctors.ToListAsync();
        }

        public async Task<List<Clinic_Doctor>> GetById(int id)
        {
            return await db.Clinic_Doctors.Where(dc => dc.Dr_id == id).ToListAsync();
        }

        public async Task<Clinic_Doctor> GetByDr_cl(int D_id, int C_id)
        {
            return await db.Clinic_Doctors.FirstOrDefaultAsync(dc => dc.Dr_id == D_id && dc.clinic_id == C_id);
        }

        public async Task<Clinic_Doctor> Update(Clinic_Doctor entity)
        {
            Clinic_Doctor oldDrCl = await db.Clinic_Doctors.FirstOrDefaultAsync(dc => dc.Dr_id == entity.Dr_id && dc.clinic_id == entity.clinic_id);
            if (oldDrCl != null)
            {
                db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await db.SaveChangesAsync();
                return entity;
            }
            return null;
        }
    }
}
