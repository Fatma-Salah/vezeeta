namespace Vezeeta.Auth
{
    public interface IAuthentication<t>
    {
        public Task<t> Login(LogInDTO loginDTO);

    }
}
