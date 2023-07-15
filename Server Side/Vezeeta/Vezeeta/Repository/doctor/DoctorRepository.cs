using Microsoft.EntityFrameworkCore;
using Vezeeta.Auth;
using Vezeeta.dbContext;
using Vezeeta.DTO.DoctorDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository.doctor
{
    public class DoctorRepository : IEntityRepository<Doctor>,IAuthentication<Doctor>,IdoctorAdd
    {

        #region fields
        private readonly VezeetaContext db;
        #endregion
        #region constructor
        public DoctorRepository(VezeetaContext _db)
        {
            db = _db;
        }
        #endregion


        public async Task<Doctor> Add(Doctor doctor)
        {
            Doctor oldDr = await db.Doctors.FirstOrDefaultAsync(d => d.email == doctor.email);
            if (oldDr == null)
            {
                await db.AddAsync(doctor);
                await db.SaveChangesAsync();
                return doctor;
            }
            return null;
        }

        public async Task DeleteById(int id)
        {
            Doctor dr = await db.Doctors.FirstOrDefaultAsync(d => d.id == id);
            if (dr != null)
            {
                dr.is_deleted = true;
                await Update(id, dr);
            }
        }

        public async Task<List<Doctor>> GetAll()
        {
            return await db.Doctors.ToListAsync();
        }

        public async Task<Doctor> GetById(int id)
        {

            return await db.Doctors.Include(d=>d.Doctors_Phones).Include(d=>d.id_specializeNavigation).Include(d=>d.id_specializeNavigation).FirstOrDefaultAsync(d => d.id == id);
        }

        public async Task<Doctor> Update(int id, Doctor doctor)
        {
            
                db.Entry(doctor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await db.SaveChangesAsync();
                return doctor;
         
        }

        #region LoginMethod for authinitication 
        public async Task<Doctor> Login(LogInDTO loginDTO)
        {

            //check dr in one line by email and password
            Doctor dr = await db.Doctors.FirstOrDefaultAsync(d => d.email == loginDTO.email && d.password == loginDTO.password);
            return dr;
        }

        public async Task<Doctor> getByMail(string email)
        {
            return await db.Doctors.FirstOrDefaultAsync(d=>d.email == email);
        }

        #endregion


    }
}
