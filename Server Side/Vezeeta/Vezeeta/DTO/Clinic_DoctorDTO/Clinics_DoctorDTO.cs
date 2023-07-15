using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vezeeta.DTO.Clinic_DoctorDTO
{
    public class Clinics_DoctorDTO
    {
        public int Dr_id { get; set; }
        [Column(TypeName = "decimal(8,2)")]
        
        public decimal? fees { get; set; }

        public int clinic_id { get; set; }
    }
}
