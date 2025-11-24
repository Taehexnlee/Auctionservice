'use server';

import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, Bid, PageResult } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PageResult<Auction>> {
  const result = await fetchWrapper.get(`search${query}`);
  return result as PageResult<Auction>;
}

export async function updateAuctionTest(): Promise<{ status: number; message: string }> {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1
  };

  const result = await fetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data);
  return result as { status: number; message: string };
}

export async function createAuction(data: FieldValues): Promise<Auction | { error: { status?: number; message?: string } }> {
  const result = await fetchWrapper.post('auctions', data);
  return result as Auction | { error: { status?: number; message?: string } };
}

export async function getDetailedViewData(id: string): Promise<Auction> {
  const result = await fetchWrapper.get(`auctions/${id}`);
  return result as Auction;
}

export async function updateAuction(data: FieldValues, id: string): Promise<{ status: number; message: string } | { error: { status?: number; message?: string } }> {
  const result = await fetchWrapper.put(`auctions/${id}`, data);
  return result as { status: number; message: string } | { error: { status?: number; message?: string } };
}

export async function deleteAuction(id: string) {
  return fetchWrapper.del(`auctions/${id}`);
}

export async function getBidsForAuction(id: string): Promise<Bid[]> {
  const result = await fetchWrapper.get(`bids/${id}`);
  return result as Bid[];
}

export async function placeBidForAuction(auctionId: string, amount: number): Promise<Bid | { error: { status?: number; message?: string } }> {
  const result = await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {});
  return result as Bid | { error: { status?: number; message?: string } };
}
