using System;
using AutoMapper;
using BiddingService.DTOs;
using BiddingService.Models;
using Contracts;

namespace BiddingService.RequestHepler;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Bid, BidDtos>();
        CreateMap<Bid, BidPlaced>();
    }
}
