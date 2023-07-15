using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.CityDTO
{
    public class CityDTO
    {
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string name { get; set; }
        [StringLength(50)]
        public string status { get; set; }

        public int region { get; set; }

    }
}
