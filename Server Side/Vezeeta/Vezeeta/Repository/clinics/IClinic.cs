using Vezeeta.Models;

namespace Vezeeta.Repository.clinics
{
    public interface IClinic
    {
        public Task<Clinic_Doctor> getByDr(int id);
    }
}
