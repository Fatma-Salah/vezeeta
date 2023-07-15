using System.Security.Claims;

namespace Vezeeta.Auth
{
    public interface IJWT
    {
        public string GenerateToken(ICollection<Claim> claims);
    }
}
