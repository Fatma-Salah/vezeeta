using Vezeeta.DTO.patientDTO;
using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IPatientAppiont
    {

        public Task<List<Patient_Appoinment>> GetAllAppointmentForPatient(int patient_id);
        public Task<List<Patient_Appoinment>> GetPatientWithAppointmentById(int id);
        public Task<List<Appointment>> GetByAppointmentId(int id);
        public Task <bool> DeleteSoft(int id, int patient_id);
        public Task Add(Patient_Appoinment appointment, int patient_id);
        public Task<bool> UpdateState(int id, int patient_id);
       }
}
