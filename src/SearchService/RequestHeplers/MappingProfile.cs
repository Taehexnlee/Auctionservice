using System;
using AutoMapper;
using Contracts;
using SearchService.Model;

namespace SearchService.RequestHeplers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<AuctionCreated, Item>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Id.ToString()));

        CreateMap<AuctionUpdated, Item>()
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Id));
    }
}
