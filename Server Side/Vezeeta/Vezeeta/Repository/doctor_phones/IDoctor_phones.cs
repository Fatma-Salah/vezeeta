using Vezeeta.Models;

namespace Vezeeta.Repository.doctor_phones
{
    public interface IDoctor_phones
    {
        public Task<List<Doctors_Phone>> GetAll();
        public Task<List<Doctors_Phone>> GetById(int id);
        public Task<Doctors_Phone> GetByPhone(int id, string phone);
        public Task<Doctors_Phone> Update(int id, Doctors_Phone entity);
        public Task DeleteById(int id, string phone);
        public Task<Doctors_Phone> Add(Doctors_Phone entity);
        public Task<Doctors_Phone> getByPhoneIsExist(string phone);
    }
}
