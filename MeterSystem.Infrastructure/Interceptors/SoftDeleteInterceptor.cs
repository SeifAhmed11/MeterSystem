//using MeterSystem.Domain.Base;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.ChangeTracking;
//using Microsoft.EntityFrameworkCore.Diagnostics;

//namespace MeterSystem.Infrastructure.Interceptors
//{
//    public class SoftDeleteInterceptor : SaveChangesInterceptor
//    {
//        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
//            DbContextEventData eventData,
//            InterceptionResult<int> result,
//            CancellationToken cancellationToken = default)
//        {
//            if (eventData.Context is null)
//                return base.SavingChangesAsync(eventData, result, cancellationToken);
            
//            foreach (EntityEntry? entry in eventData.Context.ChangeTracker.Entries())
//            {
//                switch(entry)
//                {
//                    case { State: EntityState.Deleted, Entity: BaseEntity delete }:
//                        entry.State = EntityState.Modified;
//                        delete.IsDeleted = true;
//                        break;

//                    case { State: EntityState.Modified, Entity: BaseEntity { IsDeleted: true } update }:
//                        update.IsDeleted = false;
//                        break;
//                }
//            }
//            return base.SavingChangesAsync(eventData, result, cancellationToken);
//        }
//    }
//}
