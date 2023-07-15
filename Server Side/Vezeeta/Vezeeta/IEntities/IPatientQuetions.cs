using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IPatientQuetions
    {
        public Task<Patient> GetPatientWithQuetions(int id);
    }
}
