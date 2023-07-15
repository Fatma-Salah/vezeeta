using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.ClinicDTO
{
    public class ClinicUpdateDTO
    {
        public int id { get; set; }
        
        public string name { get; set; }
       
        public string phone { get; set; }
    }
}
