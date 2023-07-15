using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.Adding_DTO
{
    public class AddQuestionDTO
    {
        public int id { get; set; }

        [Required]
        public string description { get; set; }
        [Required]
        [StringLength(100)]
        public string title { get; set; }
        public int age { get; set; }
        [StringLength(1)]
        public string gender { get; set; }
        public int spec_id { get; set; }
        public int? patient_id { get; set; }
        [StringLength(50)]
        public string type { get; set; }
    }
}
