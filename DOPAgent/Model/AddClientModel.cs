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

}
