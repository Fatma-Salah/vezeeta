using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO
{
    public class AddressDTO
    {
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string street { get; set; }
        [Required]
        [StringLength(50)]
        public string square { get; set; }
        [Required]
        [StringLength(50)]
        public string building { get; set; }
        public int floor_num { get; set; }
        public int flat_num { get; set; }
        [StringLength(150)]
        public string notes { get; set; }
        //[Required]
        public int city_id { get; set; }
        public int clinic_id { get; set; }
    }
}
