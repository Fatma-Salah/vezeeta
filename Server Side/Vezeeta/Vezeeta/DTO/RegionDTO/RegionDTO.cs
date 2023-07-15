using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.RegionDTO
{
    public class RegionDTO
    {
            public int id { get; set; }
            [Required]
            [StringLength(50)]
            public string name { get; set; }
        public string status { get; set; }

    }
}
