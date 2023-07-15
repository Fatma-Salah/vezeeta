using Vezeeta.DTO.SearchDTO;
using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface ISearch
    {
        public Task<List<Doctor>> GetAll(SearchDTO a);
    }
}
