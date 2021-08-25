using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Job.Entities
{
    public class CandidateItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public string Location { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
