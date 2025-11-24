'use client';

import { useBidStore } from "@/hooks/useBidStore";
import { numberWithCommas } from "@/lib/numberWithComma";
import { Bid } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    auctionId: string;
    highBid: number;
    seller: string;
    currentUser: { username?: string } | null;
}

export default function BidForm({ auctionId, highBid, seller, currentUser }: Props) {
    const { register, handleSubmit, reset } = useForm();
    const addBid = useBidStore(state => state.addBid);

    async function submitBid(amount: number): Promise<Bid> {
        const response = await fetch('/api/bids', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auctionId, amount }),
            cache: 'no-store',
        });

        let data: any = null;
        try {
            data = await response.json();
        } catch {
            // ignore parse errors
        }

        if (!response.ok) {
            const message = data?.message || response.statusText;
            throw { status: response.status, message };
        }

        return data as Bid;
    }

    function onSubmit(data: FieldValues) {
        if(data.amount <= highBid){ 
            reset();
            return toast.error(`Your bid must be higher than $${numberWithCommas(highBid)}`);
        }
        if (currentUser?.username && currentUser.username === seller) {
            toast.error('You cannot bid on your own auction');
            return;
        }

        submitBid(+data.amount)
            .then(bid => {
                addBid(bid);
                reset();
            })
            .catch(err => toast.error(err.message || 'Failed to place bid'));
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-2 rounded-lg py-2">
            <input
                type="number"
                {...register('amount')}
                className="input-custom"
                placeholder= {`Enter your bid (minimum bid is $${numberWithCommas(highBid +1)})`}
            />
        </form>
    )
}
