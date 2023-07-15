using Microsoft.Build.Framework;

namespace Vezeeta.DTO.patientDTO
{
    public class patientLoginDTO
    {
       
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Phone { get; set; }
    }
}
