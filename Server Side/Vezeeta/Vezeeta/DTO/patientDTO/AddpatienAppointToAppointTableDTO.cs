using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.patientDTO
{
    // until don't use 
    public class AddpatienAppointToAppointTableDTO
    {
        public string appoint_id { get; set; }
        public string patientEmail { get; set; }
        public string patientPhone { get; set; }
        public string patientGender { get; set; }
        public string patientAddress { get; set; } 
        public DateTime? start_date { get; set; }
        public DateTime? end_date { get; set; }
        public int? patients_per_day { get; set; } 
        public string type { get; set; } 
        public string state { get; set; }
    }
}
