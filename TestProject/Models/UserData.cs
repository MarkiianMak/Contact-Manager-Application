using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;

namespace TestProject.Models
{
    public class UserData
    {
        public int Id { get; set; } 
        
        [Required(ErrorMessage = "Ім'я обов'язкове")]
        [Length(2,40)]
  
        public string Name { get; set; } = "";
        [Required]
        [Length(4,12)]
 
        
        public DateOnly DateOfBirth { get; set; } 
        [Required]        
        public bool IsMarried { get; set; }

        [Required]
        [Length(10,15)]

        public required string PhoneNumber { get; set; }
        [Required]
        
        public decimal Salary { get; set; }

    }
}
