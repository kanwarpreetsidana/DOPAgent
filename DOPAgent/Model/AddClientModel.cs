using System.ComponentModel.DataAnnotations;

namespace DOPAgent.Model
{
  

    public class Tbl_RDUsers
    {

        [Key]
        public long Id { get; set; }
        public long RDAcc { get; set; }
        public string HolderName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public bool IsActive { get; set; }


    }

    public class LoginUser
    {
        public long Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string? Salt { get; set; }
    }

    public class StateMaster
    {
        [Key]
        public long StateId { get; set; }  
        public string StateName { get; set; }    
    }

    public class CityMaster
    {
        [Key]
        public long ID { get; set; }
        public long StateId { get; set; }
        public string CityName { get; set; }
    }

    public class DropDownModel
    {
        public string text { get; set; }
        public string value { get; set; }
    }


}
