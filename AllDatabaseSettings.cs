namespace Job
{
    public class CandidateDatabaseSettings : ICandidateDatabaseSettings
    {
        public string CandidateCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ICandidateDatabaseSettings : ICommonDatabaseSettings
    {
        public string CandidateCollectionName { get; set; }
    }
}
