using System.Security.Cryptography;

namespace Vezeeta.IEntities
{
    public interface IUpdateAccountRepo<t>
    {

        public Task<t> GetByMail(string mail);
        public Task<t> GetByPhone(string phone);
        public Task<bool> phoneValidation(string phone);
        public string HashPassword(string password);
        public bool VerifyPassword(string hashedPassword, string candidatePassword);




    }
}
