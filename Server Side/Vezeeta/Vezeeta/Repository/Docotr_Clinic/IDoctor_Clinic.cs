using Vezeeta.Models;

namespace Vezeeta.Repository.Docotr_Clinic
{
    public interface IDoctor_Clinic
    {
        public Task<List<Clinic_Doctor>> GetAll();
        public Task<List<Clinic_Doctor>> GetById(int id);
        public Task<Clinic_Doctor> GetByDr_cl(int D_id, int C_id);
        public Task<Clinic_Doctor> Update(Clinic_Doctor entity);
        public Task DeleteById(int Dr_id, int C_id);
        public Task<Clinic_Doctor> Add(Clinic_Doctor entity);
    }
}
