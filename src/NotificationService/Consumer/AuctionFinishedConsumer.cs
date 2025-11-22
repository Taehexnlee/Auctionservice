using System;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumer;

public class AuctionFinishedConsumer : IConsumer<AuctionFInished>
{
    private readonly IHubContext<NotificationHub> _hubContext;
    public AuctionFinishedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<AuctionFInished> context)
    {
        Console.WriteLine("--> auction finished message received");

        await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message); 
    }
}
