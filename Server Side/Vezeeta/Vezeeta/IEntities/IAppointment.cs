using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IAppointment
    {
        public Task<List<Appointment>> GetAll(int Dr_id);
        public Task<Appointment> GetById(int id, int Dr_id);
        public Task Update(int id, int Dr_id, Appointment appointment);
        public Task DeleteById(int id, int Dr_id);
        public Task Add(Appointment appointment);
    }
}
