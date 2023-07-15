using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Vezeeta.Auth
{
    public class JWTRepository :IJWT
    {

        #region Methods
        public string GenerateToken(ICollection<Claim> claims)
        {
            #region Secret Key
            SymmetricSecurityKey secritKey =
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes( "Jwt:Key to this token for vezeeta project"));
            #endregion
            SigningCredentials? signingCredentials = new SigningCredentials(secritKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken? jwtSecurityToken = new JwtSecurityToken(
                "Jwt:Issuer",
                "Jwt:Audience",
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays(1)
                );
            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }
        #endregion
    }
}
