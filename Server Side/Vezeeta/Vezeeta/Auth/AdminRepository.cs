namespace Vezeeta.Auth
{
    public class AdminRepository : IAuthentication<Admin>
    {
        public async Task<Admin> Login(LogInDTO loginDTO)
        {
            //this should be changed wit db 'admin table'
            Admin admin = new Admin();
            if (admin.email == loginDTO.email && admin.password == loginDTO.password)
            {
                return admin;
            }
            return null;

        }
    }
}
