using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vezeeta.DTO.ReviewDTO
{
    public class ReviewDTO
    {
        [Key]
        public int Dr_id { get; set; }
        [Key]
        public int patient_id { get; set; }
        [Required]
        public string value { get; set; }
        [StringLength(150)]
        public string comment { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? updated_at { get; set; }
    }
}
