using CsvHelper.Configuration;
using System.ComponentModel.DataAnnotations;
using TestProject.Models;

namespace TestProject.DTO_s
{
    public class UserDataMap : ClassMap<UserData>
    {
        public UserDataMap()
        {
            Map(m => m.Name).Name("Name");
            Map(m => m.DateOfBirth).Name("DateOfBirth");
            Map(m => m.IsMarried).Name("IsMarried");
            Map(m => m.PhoneNumber).Name("PhoneNumber");
            Map(m => m.Salary).Name("Salary");
        }

    }
}
