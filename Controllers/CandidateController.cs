using Job.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace Job.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateController : Controller
    {
        private readonly CandidateService candidateService;

        public CandidateController(CandidateService _candidateService)
        {
            this.candidateService = _candidateService;
        }
        [HttpGet]
        public ActionResult<List<CandidateItem>> Get()
        {
            var r = candidateService.Get();
            return r;
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<CandidateItem> Get(string id)
        {
            var r = candidateService.Get(id);
            return r == null ? NotFound() : (ActionResult<CandidateItem>)r;
        }


        [HttpGet("{id:length(24)}")]
        [Route("GetByUserId/{id}")]
        public ActionResult<List<CandidateItem>> GetByUserId(string id)
        {
            var r = candidateService.GetByUserId(id);
            return r == null ? NotFound() : (ActionResult<List<CandidateItem>>)r;
        }

        [HttpPost]
        [Route("Add/")]
        public IActionResult AddCandidateItem(CandidateItem item)
        {
            try
            {
                string id = candidateService.Create(item).Id;
                return Created("", new { id = id });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        [Route("UploadResume/")]
        public IActionResult UploadResume([FromForm]FileModel file)
        {
            try
            {
                //file.FileName = file.FormFile.FileName;
                file.FileName = file.FileName + ".docx";

                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }

                var res = Created("", new { name = file.FileName });
                return res;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {error = ex.Message });
            }
        }

        [HttpPut]///
        [Route("Update/")]
        public IActionResult UpdateCandidateItem(CandidateItem item)
        {
            try
            {
                CandidateItem CandidateItem = candidateService.Update(item);
                return Ok(CandidateItem);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete]
        [Route("Delete/{id:length(24)}")]
        public IActionResult DeleteCandidateItem(string id)
        {
            try
            {
                candidateService.Delete(id);
                return Ok(HttpStatusCode.NoContent);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
