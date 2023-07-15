using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.Doctor_phones_DTO
{
    public class Doctor_PhonesDTO
    {
        [StringLength(12)]
        public string phone { get; set; }
        [Required]
        public int Dr_id { get; set; }
    }
}
