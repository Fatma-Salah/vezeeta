using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IReview
    {
        public Task<List<Review>> GetAllByDoctor(int Dr_id);
        public Task<List<Review>> GetAllByPatient(int patient_id);
        public Task<Review> GetById(int Dr_id, int patient_id);
        public Task<Review> Update(int Dr_id, int patient_id, Review entity);
        public Task<Review> DeleteById(int Dr_id, int patient_id);
        public Task<Review> Add(Review entity);

    }
}
