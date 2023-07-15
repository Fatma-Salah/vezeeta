using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.Adding_DTO
{
    public class AddAppointmentDTO
    {
        public int id { get; set; }
        public int Dr_id { get; set; }
        public int? appoint_id { get; set; }
        public DateTime? start_date { get; set; }
        public DateTime? end_date { get; set; }
        public int? patients_per_day { get; set; }
        [StringLength(50)]
        public bool type { get; set; }

    }
}
