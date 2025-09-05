using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using TestProject.Context;
using TestProject.DTO_s;
using TestProject.Models;

namespace TestProject.Controllers
{
    public class UploadCsvController : Controller
    {

        private ApplicationDbContext _context;
        public UploadCsvController(ApplicationDbContext context) {

            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }



        public async Task<IActionResult> Upload()
        {
            List<UserData> data = await _context.UserData.ToListAsync();

            return View(data);

        }



        [HttpPost]
        public async Task<IActionResult> ImportCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                ModelState.AddModelError("", "Cannot choose this file");
                return RedirectToAction("Upload");
            }
            var data = new List<UserData>();

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                try
                {
                    csv.Context.RegisterClassMap<UserDataMap>();
                    var records = csv.GetRecords<UserData>().ToList();
                    foreach (var record in records)
                    {
                          data.Add(record);
                     }
                ViewBag.Data = data;

                _context.UserData.AddRange(records);
                await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    TempData["ErrorMessage"] = "Invalid CSV file";
                    return RedirectToAction("Upload");
                }


            }
            var list = await _context.UserData.ToListAsync();
            return RedirectToAction("Upload", list);
        }

        [HttpPost]

        public async Task<IActionResult> Update(int id, string name, string date, string isMarried, string phoneNumber, decimal salary) {


            var user = await _context.UserData.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Id = id;

            user.Name = name;
            if (isMarried.ToLower() == "yes")
            {
                user.IsMarried = true;
            } else
            {
                user.IsMarried = false;
            }
            user.DateOfBirth = DateOnly.Parse(date);
            user.PhoneNumber = phoneNumber;
            user.Salary = salary;

            await _context.SaveChangesAsync();


            return Ok();
        }

        [HttpPost]

        public async Task<IActionResult> Delete(int id) {

            var user = await _context.UserData.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.UserData.Remove(user);
            await _context.SaveChangesAsync();

            return Json(new { success = true }); 
        }

        

        


    }
}
