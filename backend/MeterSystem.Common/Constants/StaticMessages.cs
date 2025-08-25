using System.Globalization;
using System.Resources;

namespace MeterSystem.Common.Constants
{
    public static class StaticMessages
    {
        private static readonly ResourceManager ResourceManager =
            new ResourceManager("MeterSystem.Common.Resources.StaticMessages", typeof(StaticMessages).Assembly);

        private static string Get(string name)
        {
            return ResourceManager.GetString(name, CultureInfo.CurrentUICulture) ?? name;
        }

        // SuccessMessages
        public static string Created => Get(nameof(Created));
        public static string Updated => Get(nameof(Updated));
        public static string Deleted => Get(nameof(Deleted));
        public static string Loaded  => Get(nameof(Loaded));

        public static string Pending => Get(nameof(Pending));

        // ErrorMessages
        public static string NotFound      => Get(nameof(NotFound));
        public static string Required      => Get(nameof(Required));
        public static string Invalid       => Get(nameof(Invalid));
        public static string AlreadyExists => Get(nameof(AlreadyExists));
    }
}
