using System;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Model;

namespace SearchService.Consumers;

public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        Console.WriteLine("--> Consuming auction deleted: " + context.Message.Id);
        var result  = await DB.DeleteAsync<Item>(context.Message.Id);

        if(!result.IsAcknowledged || result.DeletedCount == 0)
        {
            throw new MessageException(
                typeof(AuctionDeleted),
                $"Failed to delete item with id {context.Message.Id}"
            );
        }
    }
}
