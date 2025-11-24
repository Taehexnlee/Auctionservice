import { numberWithCommas } from "@/lib/numberWithComma"
import { Auction, AuctionFinished } from "@/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
    finishedAuction: AuctionFinished
    auction : Auction
}

export default function AuctionFinishedToast({ auction, finishedAuction }: Props) {

    return (
        <Link href={`/auctions/details/${auction.id}`} className="flex flex-col items-center">
            <div className="flex flex-row items-center gap-2">
                <Image 
                    src={auction.imageUrl}
                    alt = "Image of car"
                    height={80}
                    width={120}
                    className="rounded-lg w-auto h-auto"
                />
                <div className="flex flex-col">
                    <span>Auction Finished {auction.make} {auction.model}</span>
                    {finishedAuction.itemSold && finishedAuction.amount ? (
                        <p>Congrats {finishedAuction.winner} who has won this auction for 
                            $${numberWithCommas(finishedAuction.amount)}</p>
                    ): (
                        <p>The item was not sold.</p>
                    )}
                </div>
                
            </div>
        </Link>
    )
}