using System.Linq;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        Console.WriteLine("--> Consuming auction created fault: " + context.Message.Message.Id);

        var exception = context.Message.Exceptions.FirstOrDefault();
        if (exception == null)
        {
            Console.WriteLine("--> Fault message contained no exception details");
            return;
        }

        if (exception.ExceptionType == "System.ArgumentException" && exception.Message.Contains("Invalid model Foo"))
        {
            Console.WriteLine("--> Handling known exception for invalid model Foo.");
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("--> Unhandled exception type: " + exception.ExceptionType);
             
        }
    }
}
