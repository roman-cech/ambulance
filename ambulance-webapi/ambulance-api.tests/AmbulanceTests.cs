using System;
using System.Collections.Generic;
using System.Linq;
using eu.incloud.ambulance.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ambulance_api.tests
{
    [TestClass]
    public class AmbulanceTests
    {
        [DataTestMethod]
        [DynamicData("SinglePatientScenarios")]
        public void SinglePatientBeforeOpeningHours_WillNotEnterBeforeOpeningAmbulance(Ambulance ambulance){
            // given
            var ambulanceOpeningTime = new TimeSpan(8,0,0);

            // when
            ambulance.EstimateAndSortWaitingListEntries();
            var result = ambulance.WaitingList;

            DateTime? patientEnterAmbulanceTime = ambulance.WaitingList[0].Estimated;


            // then
            Assert.IsTrue(
                (patientEnterAmbulanceTime - DateTime.Today) >= ambulanceOpeningTime
            );
        }

        [DataTestMethod]
        [DynamicData("SinglePatientScenarios")]
        public void PatientBeforeOpeningHours_WillNotEnterBeforeOpeningAmbulance(Ambulance ambulance){
            // given
            var ambulanceOpeningTime = new TimeSpan(8,0,0);

            // when
            ambulance.EstimateAndSortWaitingListEntries();
            var result = ambulance.WaitingList;

            // then
            Assert.IsTrue(
                ambulance.WaitingList[0].Estimated >= ambulance.WaitingList[0].Since,
                "patient cannot enter ambulance before his arrival" );
        }

        static public IEnumerable<object[]> SinglePatientScenarios
        {
            get
            {
                var ambulances =  new Ambulance[]
                {
                    new Ambulance
                    {
                        OpeningTime = "08:00",
                        WaitingList = new List<WaitingListEntry>
                        {
                            new WaitingListEntry
                            {
                                Id = "test",
                                PatientId = "test-patient",
                                Name = "Patient Test",
                                Since = DateTime.Today + new TimeSpan(9, 40, 0),
                                Estimated = null
                            }
                        }
                    },
                    new Ambulance
                    {
                        OpeningTime = "08:00",
                        WaitingList = new List<WaitingListEntry>
                        {
                            new WaitingListEntry
                            {
                                Id = "test",
                                PatientId = "test-patient",
                                Name = "Patient Test",
                                Since = DateTime.Today + new TimeSpan(6, 32, 0),
                                Estimated = null
                            }
                        }
                    },
                    new Ambulance
                    {
                        OpeningTime = "08:00",
                        WaitingList = new List<WaitingListEntry>
                        {
                            new WaitingListEntry
                            {
                                Id = "test",
                                PatientId = "test-patient",
                                Name = "Patient Test",
                                Since = DateTime.Today + new TimeSpan(10, 32, 0),
                                Estimated = DateTime.Today + new TimeSpan(11, 0, 0)
                            }
                        }
                    }
                };
                return ambulances.Select( _ => new object[] { _ });
            }
        }
        
         [TestMethod]
        public void TestEstimation_AcceptsNullOrEmptyWaitingList()
        {
            /// given
            var ambulance = new Ambulance {
                Id = "test-ambulance",
                Name = "Test Ambulance",
                RoomNumber = "212",
                PredefinedConditions = new List<Condition>()
            };

            /// when
            ambulance.EstimateAndSortWaitingListEntries();
            var result = ambulance.WaitingList;

            /// then
            Assert.AreNotEqual(null, result);
        }

        [TestMethod]
        public void FirstPatientLeavesAmbulance_NextPatientEntersJustAfterwards()
        {
            // given
            var ambulance = new Ambulance
            {
                OpeningTime = "08:00",
                WaitingList = new List<WaitingListEntry>
                {
                    new WaitingListEntry
                    {
                        Id = "A",
                        PatientId = "test-patient-A",
                        Name = "Patient Test A",
                        Since = DateTime.Today + new TimeSpan(9, 40, 0),
                        Estimated = DateTime.Today + new TimeSpan(5, 0, 0)
                    },
                    new WaitingListEntry
                    {
                        Id = "B",
                        PatientId = "test-patient",
                        Name = "Patient Test",
                        Since = DateTime.Today + new TimeSpan(7, 20, 0),
                        EstimatedDurationMinutes = 25
                    }
                }
            };

            // when
            ambulance.EstimateAndSortWaitingListEntries();
            var result = ambulance.WaitingList;

            // then  
            WaitingListEntry previous = null;
            foreach(var next in result)
            {
                if(previous == null)
                {
                    previous = next;
                    continue;
                }
                Assert.IsTrue(
                    previous.Estimated
                    + TimeSpan.FromMinutes(previous.EstimatedDurationMinutes ?? 15)
                    <= next.Estimated);
            }
        }
    }
}
