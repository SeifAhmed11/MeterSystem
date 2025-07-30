using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterSystem.Domain.Constants
{
    public static class Messages
    {
        //public const string ConsumptionCreated = "Consumption created successfully.";
        //public const string ConsumptionDeleted = "Consumption deleted successfully.";
        //public const string ConsumptionNotFound = "Consumption not found.";
        //public const string CurrentReadingInvalid = "Current reading must be greater than or equal to previous reading.";
        //public const string MeterIdRequired = "Meter ID is required.";
        //public const string Success = "Operation completed successfully.";
        //public const string Failure = "Operation failed. Please try again later.";

        // Common
        public const string MeterCreated = "Meter created successfully.";
        public const string MeterUpdated = "Meter updated successfully.";
        public const string Deleted = "Deleted successfully.";
        public const string Loaded = "Loaded successfully.";
        public const string NotFound = "Item not found.";
        public const string InvalidId = "Invalid ID.";
        public const string RequiredField = "This field is required.";

        // Meter
        public const string MeterNotFound = "Meter not found.";
        public const string MeterIdRequired = "Meter ID is required.";
        public const string MeterSerialRequired = "Meter serial is required.";

        // Recharge
        public const string RechargeCreated = "Recharge created successfully.";
        public const string RechargeUpdated = "Recharge updated successfully.";
        public const string RechargeNotFound = "Recharge not found.";
        public const string RechargeIdRequired = "Recharge ID is required.";
        public const string InvalidAmount = "Amount must be greater than zero.";
        public const string RechargeDateRequired = "Recharge date is required.";

        // Customer
        public const string CustomerCreated = "Customer created successfully.";
        public const string CustomerUpdated = "Customer updated successfully.";
        public const string CustomerIdRequired = "Customer ID is required.";
        public const string CustomerNotFound = "Customer not found.";

        // Consumption
        public const string ConsumptionCreated = "Consumption created successfully.";
        public const string ConsumptionUpdated = "Consumption updated successfully.";
        public const string ConsumptionNotFound = "Consumption not found.";
        public const string InvalidReading = "Current reading must be greater than or equal to previous reading.";
    }
}
