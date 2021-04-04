using System.IO;
using eu.incloud.ambulance.Models;
using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace eu.incloud.ambulance.Services
{
    class DataRepository : IDataRepository
    {
        private readonly LiteDatabase liteDb;
        private static readonly string AMBULANCES_COLLECTION = "ambulances";

        public DataRepository(
            IHostingEnvironment environment, IConfiguration configuration)
        {
            string dbPath = configuration["DATA_REPOSITORY_DB"];
            if (dbPath == null || dbPath.Length == 0)
            {
                dbPath = Path.Combine(
                    environment.ContentRootPath, "data-repository.litedb");
            }
            this.liteDb = new LiteDatabase(dbPath);
        }

        public Ambulance GetAmbulanceData(string ambulanceId)
        {
            var collection = this.liteDb.GetCollection<Ambulance>(AMBULANCES_COLLECTION);
            var ambulance = collection.FindById(ambulanceId);
            if(ambulance != null)
            {
                ambulance.EstimateAndSortWaitingListEntries();
            }
            return ambulance;
        }

        public Ambulance UpsertAmbulanceData(Ambulance ambulance)
        {
            ambulance.EstimateAndSortWaitingListEntries();

            var collection = this.liteDb.GetCollection<Ambulance>(AMBULANCES_COLLECTION);
            var existing = collection.FindById(ambulance.Id);
            if(existing == null)
            {
                var idValue = collection.Insert(ambulance);
                ambulance.Id = idValue.AsString;
            }
            else
            {
                collection.Update(ambulance);
            }
            return ambulance;
        }

        public void DeleteAmbulance(string ambulanceId)
        {
            var collection = this.liteDb.GetCollection<Ambulance>(AMBULANCES_COLLECTION);
            collection.Delete(ambulanceId);
        }
    }
}