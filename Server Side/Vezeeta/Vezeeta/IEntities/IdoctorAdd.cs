using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IdoctorAdd
    {
        public Task<Doctor> getByMail(string email);
    }
}
