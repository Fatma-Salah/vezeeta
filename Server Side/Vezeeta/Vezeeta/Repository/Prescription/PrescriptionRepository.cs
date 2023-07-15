using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class PrescriptionRepository : IPrescription
    {

        //fields
        VezeetaContext dbContext;

        //constructor
        public PrescriptionRepository(VezeetaContext context)
        {
            dbContext = context;
        }

        //methods
        public async Task<Prescription> Add(Prescription prescription)
        {
            await dbContext.AddAsync(prescription);
            await dbContext.SaveChangesAsync(); 
            return prescription;
        }

        public async Task<Prescription> DeleteById(int Dr_id, int P_id)
        {
            Prescription? pres = await GetById(Dr_id, P_id);
            if (pres != null)
            {
                dbContext.Remove(pres);
                await dbContext.SaveChangesAsync();
                return pres;
            }
            return null;

        }

        public async Task<IEnumerable<Prescription>> GetAllByDoctor(int Dr_id)
        {
            return await dbContext.Prescriptions.Include(p => p.Dr).Include(p => p.patient).Where(p => p.Dr_id == Dr_id).ToListAsync();
        }

        public async Task<IEnumerable<Prescription>> GetAllByPatient(int P_id)
        {
            return await dbContext.Prescriptions.Include(p => p.Dr).Include(p => p.patient).Where(p => p.patient_id == P_id).ToListAsync();
        }

        public async Task<Prescription> GetById(int Dr_id, int P_id)
        {
            return await dbContext.Prescriptions.Include(p => p.Dr).Include(p => p.patient).FirstOrDefaultAsync(p => p.Dr_id == Dr_id && p.patient_id == P_id);
        }

        public async Task<Prescription> Update(int Dr_id, int P_id, Prescription prescription)
        {
            Prescription? pres = await GetById(Dr_id, Dr_id);
            if (pres != null)
            {
                dbContext.Entry(prescription).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();
                return pres;
            }
            return null;
        }
    }
}
