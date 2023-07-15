using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Vezeeta.Models;

namespace Vezeeta.DTO.patientDTO
{
    public class addPatientDTO
    { 
        public string patientName { get; set; } 
        public string patientEmail { get; set; }
        public string patientPhone { get; set; } 
        public DateTime patientBirth_date { get; set; } 
        public string patientGender { get; set; }
        public string patientAddress { get; set; }
        public int? patientCode { get; set; }
        public string patientPassword { get; set; }

    }
}
