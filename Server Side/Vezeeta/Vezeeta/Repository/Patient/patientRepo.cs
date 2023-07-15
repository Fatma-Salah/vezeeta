using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Vezeeta.Auth;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class patientRepo : IEntityRepository<Patient>, IUpdateAccountRepo<Patient>,IAuthentication<Patient>,IPatientQuetions
    {
        private readonly VezeetaContext DB;

        public patientRepo(VezeetaContext _DB)
        {
            DB = _DB;
        }
        public async Task<Patient> Add(Patient patient)
        {
            await DB.AddAsync(patient);
            await DB.SaveChangesAsync();
            return patient;
        }

        public async Task DeleteById(int id)
        {
            Patient p = await DB.Patients.FindAsync(id);
            if (p != null)
            {
                //DB.Remove(p);    //deleted
                p.is_deleted = true;
                await DB.SaveChangesAsync();

            }
        }

        public async Task<List<Patient>> GetAll()
        {
            return await DB.Patients.ToListAsync();
        }

        public async Task<Patient> GetById(int id)
        {
            return await DB.Patients.FirstOrDefaultAsync(a => a.id == id);


        }

        public async Task<Patient> Update(int id, Patient patient)
        {
            DB.Entry(patient).State = EntityState.Modified;
            await DB.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient> GetByMail(string mail)
        {
                   return await DB.Patients.FirstOrDefaultAsync(p => p.email == mail);
             
        }
        public async Task<Patient> GetByPhone(string phone)
        {
          return   await DB.Patients.FirstOrDefaultAsync(p => p.phone == phone);
            
        }
        public string HashPassword(string password)
        {//method don't use ,pass can't restore again
            // Use a secure hashing algorithm, such as SHA256 or bcrypt, to hash the password
            byte[] salt = new byte[16];
            new RNGCryptoServiceProvider().GetBytes(salt);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string hashedPassword = Convert.ToBase64String(hashBytes);
            return hashedPassword;  
        }
      
        public bool VerifyPassword(string storedPasswordHash, string candidatePassword)
{
    try
    { 
        byte[] storedHashBytes = Convert.FromBase64String(storedPasswordHash);
                 
        byte[] salt = new byte[16];
        Array.Copy(storedHashBytes, 0, salt, 0, 16);
                 
        var bcrypt = new BCrypt.Net.BCrypt();
                int saltValue = BitConverter.ToInt32(salt, 0);
 string candidateHash = BCrypt.Net.BCrypt.HashPassword(candidatePassword, saltValue);
                  
        return candidateHash == storedPasswordHash;
    }
    catch (Exception ex)
    {
        // Log the error and return false
        Console.WriteLine($"Error verifying password: {ex.Message}");
        return false;
    }
}

        #region verivication pass , don't work
        //public bool VerifyPassword(string hashedPassword, string candidatePassword)
        //{
        //    try
        //    {
        //        byte[] candidateBytes = Encoding.UTF8.GetBytes(candidatePassword);
        //        byte[] hashBytes = Convert.FromBase64String(hashedPassword);
        //        byte[] salt = new byte[16];
        //        Array.Copy(hashBytes, 0, salt, 0, 16);
        //        var pbkdf2 = new Rfc2898DeriveBytes(candidateBytes, salt, 10000);
        //        byte[] hash = pbkdf2.GetBytes(20);
        //        for (int i = 0; i < 20; i++)
        //        {
        //            if (hashBytes[i + 16] != hash[i])
        //            {
        //                return false;
        //            }
        //        }

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the error and return false
        //        Console.WriteLine($"Error verifying password: {ex.Message}");
        //        return false;
        //    }
        //}

        #endregion
        public async Task<bool> phoneValidation(string phoneNumber)
        {

            if (string.IsNullOrEmpty(phoneNumber))
            {
                return false;
            }

            var numericPhoneNumber = new string(phoneNumber.Where(char.IsDigit).ToArray());

            if (numericPhoneNumber.Length == 11 && numericPhoneNumber.StartsWith("01") &&
           Regex.IsMatch(numericPhoneNumber, @"^01[0125][0-9]{8}$") ||
       numericPhoneNumber.Length == 8 && numericPhoneNumber.StartsWith("2") &&
           Regex.IsMatch(numericPhoneNumber, @"^2[0-5][0-9]{6}$"))
            {
                return true;
            }

            return false;
        }

        public async Task<Patient> Login(LogInDTO loginDTO)
        {
            Patient? patient;
            if (await phoneValidation(loginDTO?.email))
            {
                 patient=  await GetByPhone(loginDTO.email);
            }
            else
            {
                patient = await GetByMail(loginDTO.email);
            }
            if (patient == null)
            {
                return null;
            }
            else
            {
                if ((patient.email == loginDTO.email || patient.phone == loginDTO.email) && patient.password == loginDTO.password)
                {
                    return patient;
                }
            }
            return null;
        }

        public async Task<Patient> GetPatientWithQuetions(int id)
        {
            return await DB.Patients
                .Include(p => p.Questions)
                .ThenInclude(q => q.Answers)
                .ThenInclude(a => a.Dr)
                .ThenInclude(d => d.id_specializeNavigation)
                .FirstOrDefaultAsync(p => p.id == id);
        }
    }
}
