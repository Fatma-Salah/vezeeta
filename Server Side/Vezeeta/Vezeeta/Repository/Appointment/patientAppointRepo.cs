using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Vezeeta.dbContext;
using Vezeeta.DTO.patientDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class patientAppointRepo : IPatientAppiont
    {
        private VezeetaContext dp;

        public patientAppointRepo( VezeetaContext _dp)
        {
            dp = _dp;
        }
      public  async Task  Add(Patient_Appoinment appointment, int patient_id)
        {
            // add data to Patient_Appoinments table
            await dp.Patient_Appoinments.AddAsync(appointment);
            await dp.SaveChangesAsync();
            // add data to Patient_Appoinments table
         //Patient_Appoinment  p = await dp.Patient_Appoinments.Include(a => a.patient_id == patient_id).FirstOrDefaultAsync();
         //Appointment rowForAdding= await dp.Appointments.Include(a => a.Dr_id == DoctorID).FirstOrDefaultAsync();
         //   if(p !=null)
            //{
            //    if (rowForAdding != null)
            //    {
            //        await dp.Appointments.AddAsync(fullAppointment);
            //        await dp.SaveChangesAsync();
            //    }
            //}
    
        }

        public async Task <bool> DeleteSoft(int id, int patient_id)
        {
           Patient_Appoinment p= await dp.Patient_Appoinments.Where(a=>a.id==id).FirstOrDefaultAsync(a=>a.patient_id==patient_id);
            if (p == null) return false;
            
                p.state = false;
                // p.state = 0;  ==>byte
                await dp.SaveChangesAsync();
            return true;
            }

        public async Task<List<Patient_Appoinment>> GetAllAppointmentForPatient(int patient_id)
        {
            List<Patient_Appoinment> patients_appoint = await dp.Patient_Appoinments
                  .Include(a => a.patient)
                  .Where(a => a.patient_id == patient_id).ToListAsync();

            return patients_appoint;
        }

        public async Task<List<Appointment>> GetByAppointmentId(int id)
        {
            List<Appointment> patients_appoint = await dp.Appointments.Include(a => a.appoint).Where(a => a.appoint_id == id)
                  .ToListAsync();

            return patients_appoint;
        }

        public async Task<List<Patient_Appoinment>> GetPatientWithAppointmentById(int id)
        {
            List<Patient_Appoinment> appoint = await dp.Patient_Appoinments.Include(a => a.patient)
           .Where(a => a.patient_id == id).ToListAsync();
            return appoint;
        }

       public async Task<bool> UpdateState(int id, int patient_id)
        {
            Patient_Appoinment p = await dp.Patient_Appoinments.Where(a => a.id == id).FirstOrDefaultAsync(a => a.patient_id == patient_id);
            if (p == null) return false;
            p.state = (p.state == false) ? true : false;
            //  p.state = (p.state == 0) ? 1 : 0;  ==>byte
            await dp.SaveChangesAsync();
            return true;
        }
    }
}
