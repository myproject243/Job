using Microsoft.AspNetCore.Http;

namespace Job.Entities
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
