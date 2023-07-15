using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq;
using Vezeeta.dbContext;
using Vezeeta.DTO.SearchDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class SearchReposatory : ISearch
    {
        private readonly VezeetaContext context;
        public SearchReposatory(VezeetaContext context)
        {
            this.context = context;
        }

         async Task<List<Clinic_Doctor>> GetAll()
        {
            var temp= await context.Clinic_Doctors.Include(a => a.clinic).ThenInclude(a => a.Address).ThenInclude(a => a.city).ThenInclude(a => a.region).Include(a => a.Dr).ToListAsync();
                return temp;
                }
        public async Task<List<Doctor>> GetAll(SearchDTO search)
        {
            var temp=await GetAll();
            if (temp == null) { return null; }
            //      NavigationExpansionExtensibilityHelperDependencies to update database
            if (search.City != 0)
            {
                temp = temp.Where(a => a.clinic.Address.city.id==search.City).ToList();

            }

            if (search.Reigon != 0)
            {
                temp = temp.Where(a => a.clinic.Address.city.region.id==search.Reigon).ToList();

            }
            if (search.Specialization != 0)
            {
                temp = temp.Where(a => a.Dr?.id_specialize==search.Specialization).ToList();
            }
                                

            if (search.Name !="")
            {
                var holder=search.Name.ToLower();
                temp = temp.Where(a => a.Dr.name.ToLower().Contains( holder)).ToList();
            }

            if (search.Gender!="" && (search.Gender.ToLower()=="m"|| search.Gender.ToLower() == "f")) {
                var holder = search.Gender.ToLower();
                temp = temp.Where(a=>a.Dr.gender.ToLower()==holder).ToList();
            }


            var list=new List<Doctor>();
            foreach (var d in temp) {
             //   if(list.FirstOrDefault(a=>a.id==d.Dr.id )==null)
                list.Add(d.Dr);
            }
            return list;
        }
    }
}
