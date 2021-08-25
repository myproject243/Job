using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Job.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {

        [HttpGet]
        [Route("ok")]
        public IActionResult Index()
        {
            return Ok(new { ok = "ok" });
        }

        [HttpGet]
        [Route("AAA")]
        public IActionResult AA(string id)
        {
            return Ok(new { a = "a" + id });
        }

        [HttpGet]
        [Route("bbb")]
        public IActionResult BB()
        {
            return Ok(new { b = "b" });
        }
    }
}
