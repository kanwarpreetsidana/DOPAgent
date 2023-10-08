using Dapper;
using DOPAgent.Context;
using DOPAgent.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Net;

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


            var entityToAdd = new Tbl_RDUsers
            {
                RDAcc = userData.RDAcc,
                HolderName = userData.HolderName,
                CreatedDate = userData.CreatedDate,

            };

            _context.Tbl_RDUsers.Add(entityToAdd);
            _context.SaveChanges();


        }
        catch (Exception ex)
        {

            return Ok(new { message = "Fail" });
        }

        return Ok(new { message = "Success" });
    }



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

        return Ok(new { message = "Success" });
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
