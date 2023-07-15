using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.Models;

namespace Vezeeta.Repository.doctor_phones
{
    public class Doctor_phonesRepository:IDoctor_phones
    {
        #region fields
        private readonly VezeetaContext db;
        #endregion

        #region constructor
        public Doctor_phonesRepository(VezeetaContext _db)
        {
            db = _db;
        }
        #endregion

        public async Task<Doctors_Phone> Add(Doctors_Phone entity)
        {

            var drPhone = await db.Doctors_Phones.FirstOrDefaultAsync(d => d.phone == entity.phone);
            if (drPhone == null)
            {
                await db.AddAsync(entity);
                await db.SaveChangesAsync();
                return entity;
            }
            return null;
        }

        public async Task DeleteById(int id, string phone)
        {
            var drPhone = await db.Doctors_Phones.FirstOrDefaultAsync(d => d.Dr_id == id && d.phone == phone);

            if (drPhone != null)
            {
                db.Remove(drPhone);
                await db.SaveChangesAsync();
            }
        }

        public async Task<List<Doctors_Phone>> GetAll()
        {
            return await db.Doctors_Phones.ToListAsync();
        }

        public async Task<List<Doctors_Phone>> GetById(int D_id)
        {
            return await db.Doctors_Phones.Where(d => d.Dr_id == D_id).ToListAsync();
        }

        public async Task<Doctors_Phone> GetByPhone(int id, string phone)
        {
            var Dr_Phone = await db.Doctors_Phones.FirstOrDefaultAsync(d => d.Dr_id == id && d.phone == phone);
            return Dr_Phone;
        }

        public async Task<Doctors_Phone> getByPhoneIsExist(string phone)
        {
          return await db.Doctors_Phones.FirstOrDefaultAsync(d=>d.phone == phone);
         
        }

        public async Task<Doctors_Phone> Update(int id, Doctors_Phone entity)
        {
            db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await db.SaveChangesAsync();
            return entity;
        }


    }
}
