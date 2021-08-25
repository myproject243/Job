using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using Job;
using Job.Entities;

namespace Services
{
    public class CandidateService
    {
        private readonly IMongoCollection<CandidateItem> CandidateItems;

        public CandidateService(ICandidateDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            CandidateItems = database.GetCollection<CandidateItem>(settings.CandidateCollectionName);
        }

        public CandidateItem Create(CandidateItem CandidateItem)
        {
            CandidateItems.InsertOne(CandidateItem);
            return CandidateItem;
        }

        public CandidateItem Update(CandidateItem CandidateItem)
        {
            CandidateItems.ReplaceOne(item => item.Id == CandidateItem.Id, CandidateItem);
            return CandidateItem;
        }

        public List<CandidateItem> Get()
        {
            List<CandidateItem> Candidates;
            Candidates = CandidateItems.Find(emp => true).ToList();
            return Candidates;
        }

        public CandidateItem Get(string id) =>
            CandidateItems.Find<CandidateItem>(item => item.Id == id).FirstOrDefault();

        public List<CandidateItem> GetByUserId(string userId) =>
           CandidateItems.Find<CandidateItem>(item => item.UserId == userId).ToList();

        internal void Delete(string id)
        {
            CandidateItems.DeleteOne<CandidateItem>(item => item.Id == id);
        }
    }
}
