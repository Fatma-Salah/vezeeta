namespace Vezeeta.DTO.Adding_DTO
{
    public class AddPrescriptionDTO
    {
        public int Dr_id { get; set; }
        public int patient_id { get; set; }
        public string medicine { get; set; }
        public string description { get; set; }
    }
}
