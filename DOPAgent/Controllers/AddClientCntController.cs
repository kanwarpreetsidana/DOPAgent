using DOPAgent.Model;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AddClientCntController : ControllerBase
{
    [HttpPost("InsertAddClient")] // Route for the InsertAddClient action
    public IActionResult InsertAddClient([FromBody] AddClientModel userData)
    {
        var response = new { result = 0 };

        return Ok(response);
    }


}
