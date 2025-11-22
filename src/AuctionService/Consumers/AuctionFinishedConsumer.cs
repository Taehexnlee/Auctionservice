using System;
using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFInished>
{
    private readonly AuctionDbContext _dbcontext;
    public AuctionFinishedConsumer(AuctionDbContext dbContext)
    {
        _dbcontext = dbContext;
    }
    public async Task Consume(ConsumeContext<AuctionFInished> context)
    {   
        Console.WriteLine("--> Consuming Auction Finished");
        var auction = await _dbcontext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));
        if(context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.Amount;
        }
        auction.Status = auction.SoldAmount > auction.ReservePrice
            ? Status.Finished : Status.ReserveNotMet;
        await _dbcontext.SaveChangesAsync();
    }
}
