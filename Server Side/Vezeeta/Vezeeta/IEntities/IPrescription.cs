using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IPrescription
    {
        public Task<IEnumerable<Prescription>> GetAllByDoctor(int Dr_id);
        public Task<IEnumerable<Prescription>> GetAllByPatient(int P_id);
        public Task<Prescription> GetById(int Dr_id, int P_id);
        public Task<Prescription> Update(int Dr_id, int P_id, Prescription pres);
        public Task<Prescription> DeleteById(int Dr_id, int P_id);
        public Task<Prescription> Add(Prescription pres);
    }
}
