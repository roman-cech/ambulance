using eu.incloud.ambulance.Models;

namespace eu.incloud.ambulance.Services
{
    /// <summary>
    /// Abstraction of the data repository keeping data model persistent
    ///
    /// Responsibilities:
    ///     * CRUD operations over data maodel
    ///     * Searching and filtering durring data retrieval
    /// </summary>
    public interface IDataRepository
    {
        /// <summary>
        /// Provides details about specific ambulance
        /// </summary>
        /// <param name="ambulanceId">id of the ambulance</param>
        /// <returns>ambulance details</returns>
        Ambulance GetAmbulanceData(string ambulanceId);

        /// <summary>
        /// Updates or inserts details about specific/new ambulance
        /// </summary>
        /// <param name="ambulance">ambulance data</param>
        /// <returns>ambulance instance with correct id, if inserting</returns>
        Ambulance UpsertAmbulanceData(Ambulance ambulance);

        /// <summary>
        /// Deletes details about specific ambulance
        /// </summary>
        /// <param name="ambulanceId">id of the ambulance</param>
        void DeleteAmbulance(string ambulanceId);
    }
}
