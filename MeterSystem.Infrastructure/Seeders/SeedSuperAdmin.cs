using MeterSystem.Common.Enum;
using MeterSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace MeterSystem.Infrastructure.Seeders
{
    public class SeedSuperAdmin
    {
        public static async Task SeederSuperAdmin(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            var superAdminEmail = "superadmin@example.com";
            var superAdminPassword = "SuperAdmin@123";

            // Ensure role exists
            if (!await roleManager.RoleExistsAsync(UserRoles.SuperAdmin.ToString()))
                await roleManager.CreateAsync(new IdentityRole<Guid>(UserRoles.SuperAdmin.ToString()));

            var superAdmin = await userManager.FindByEmailAsync(superAdminEmail);
            if (superAdmin == null)
            {
                superAdmin = new User
                {
                    UserName = superAdminEmail,
                    Email = superAdminEmail,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(superAdmin, superAdminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superAdmin, UserRoles.SuperAdmin.ToString());
                }
            }
        }

    }
}
