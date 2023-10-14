using Dapper;
using DOPAgent.Context;
using DOPAgent.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("[controller]")]
public class AddClientCntController : ControllerBase
{
    private readonly KanwarContext _context;

    public AddClientCntController(KanwarContext context)
    {
        _context = context;
    }


    [HttpPost("InsertAddClient")] // Route for the InsertAddClient action
    public IActionResult InsertAddClient([FromBody] Tbl_RDUsers userData)
    {

        try
        {

            if (userData.Id == 0)
            {

                var entityToAdd = new Tbl_RDUsers
                {
                    RDAcc = userData.RDAcc,
                    HolderName = userData.HolderName,
                    CreatedDate = userData.CreatedDate,

                };

                _context.Tbl_RDUsers.Add(entityToAdd);
                _context.SaveChanges();
            }

            else
            {

                var existing = _context.Tbl_RDUsers.FirstOrDefault(c=> c.Id == userData.Id);

                if (existing != null)
                {
                    existing.RDAcc = userData.RDAcc;
                    existing.HolderName = userData.HolderName;
                    existing.CreatedDate = userData.CreatedDate;
                    _context.SaveChanges();
                }
            }



        }
        catch (Exception ex)
        {

            return Ok(new { message = "Fail" });
        }

        return Ok(new { message = "Success" });
    }



    [HttpPost("DeleteClient")] 
    public IActionResult DeleteClient([FromBody] long Id)
    {

        try
        {

           var client = _context.Tbl_RDUsers.FirstOrDefault(c => c.Id == Id );
           if(client != null)
           {
                _context.Tbl_RDUsers.Remove(client);
                _context.SaveChanges();

           }


        }
        catch (Exception ex)
        {

            return Ok(new { message = "Fail" });
        }

        return Ok(new { message = "Success" });
    }



   

    [HttpPost("GetAddClientID")]
    public IActionResult GetAddClientID([FromBody] long Id)
    {

        try
        {
            var results = _context.Tbl_RDUsers.FirstOrDefault(c => c.Id == Id);

            return Ok(results);

        }
        catch (Exception ex)
        {

            return Ok(new { message = "Fail" });
        }

    }


    [HttpPost("LoginUser")] // Route for the InsertAddClient action
    public IActionResult LoginUser([FromBody] LoginUser loginuser)
    {

        try
        {

            bool isPasswordVerified = false;
            var results = _context.loginuser.FirstOrDefault(c => c.Username == loginuser.Username);

            if(results != null)
            {
                isPasswordVerified =  VerifyPassword(loginuser.Password, results.Password, results.Salt);
            }

            if(isPasswordVerified  == false)
            {
                return Ok(new { message = "Fail" });
            }
            else
            {

                // If the password is verified, create a JWT token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("mW5iqNOKbHqE5bB1u4SyyFk2UypnSqS1"); // Replace with your secure secret key
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, loginuser.Username),
                        // Add additional claims as needed
                    }),
                    Expires = DateTime.UtcNow.AddHours(1), // Set the token expiration time
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                
                return Ok(new { message = "Success" , token = tokenString});
            }

        }
        catch (Exception ex)
        {

            return Ok(new { message = "Fail" });
        }

    }


    public string HashPassword(string password)
    {
        // Generate a random salt
        string salt = BCrypt.Net.BCrypt.GenerateSalt(7);

        // Hash the password using the generated salt
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

        return hashedPassword;
    }

    public bool VerifyPassword(string enteredPassword, string hashedPassword, string salt)
    {
        // Hash the entered password using the retrieved salt
        string hashedEnteredPassword = BCrypt.Net.BCrypt.HashPassword(enteredPassword, salt);

        // Compare the stored hashed password with the hashed entered password
        return hashedEnteredPassword == hashedPassword;
    }


    [Authorize]
    [HttpGet("GetAddClient")]
    public IActionResult GetAddClient()
    {

        try
        {

            var results = _context.Tbl_RDUsers.FromSqlRaw("EXEC GetTbl_RDUsers").ToArray();

            return Ok(results);


        }
        catch (Exception ex)
        {

            return Ok(new { message = "Fail" });
        }


    }

    //public static T ExeScalarQuery<T>(String QueryText, DynamicParameters paras)
    //{
    //string LogoutDateTime = ExeScalarQuery<string>("SELECT top 1 [HolderName] from [dbo].[Tbl_RDUsers]", null);

    //    T Result;
    //    using (SqlConnection conn = new SqlConnection("Data Source=192.168.0.250;Initial Catalog=Kanwar;Integrated Security=false;user id=HomeUser4;password=H0me!@nd@23Lat1tut4;TrustServerCertificate=True"))
    //    {
    //        ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;

    //        if (conn.State == System.Data.ConnectionState.Closed)
    //            conn.Open();
    //        Result = conn.Query<T>(QueryText, paras).FirstOrDefault();
    //    }
    //    return Result;
    //}


}
