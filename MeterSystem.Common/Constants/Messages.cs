namespace MeterSystem.Common.Constants
{
    public static class Messages
    {
        // SuccessMessages
        public static string Created(string entityName) => $"{entityName} created successfully.";
        public static string Updated(string entityName) => $"{entityName} updated successfully.";
        public static string Deleted(string entityName) => $"{entityName} deleted successfully.";
        public static string Loaded(string entityName) => $"{entityName} loaded successfully.";

        // ErrorMessages
        public static string NotFound(string entityName) => $"{entityName} not found.";
        public static string Required(string fieldName) => $"{fieldName} is required.";
        public static string Invalid(string fieldName) => $"{fieldName} is invalid.";
        public static string AlreadyExists(string entityName) => $"{entityName} already exists.";
        public static string MustBeGreaterThan(string field, decimal value) => $"{field} must be greater than {value}.";
        public static string MustBeGreaterOrEqual(string field1, string field2) => $"{field1} must be greater than or equal to {field2}.";
    }
}
