'use client';

import { useBidStore } from "@/hooks/useBidStore";
import { se } from "date-fns/locale";
import { usePathname } from "next/navigation";
import Countdown, { zeroPad } from "react-countdown";

const renderer = ({ days ,hours, minutes, seconds, completed }: 
    { days: number; hours: number; minutes: number; seconds: number; completed: boolean }) => {
    return (
        <div className={`boder-2 boder-white text-white py-1 px-2 rounded-lg justify-center
            ${completed ? 'bg-red-600' : (days === 0 && hours < 10) ? 'bg-amber-600' : 'bg-green-600' }
        `}>
        {completed ? (
            <span>Auction Finished</span>
        ) : (
            <span suppressHydrationWarning={true}>
                {days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        )}
     </div>
    )
};
type Props = {
    auctionEnd : string
}
export default function CountDownTimer({auctionEnd}: Props) {
    const setOpen = useBidStore(state => state.setOpen);
    const pathname = usePathname();
    function auctionFinished() {
        if(pathname.startsWith('/auctions/details')) {
             setOpen(false);
        }
    }
  return (
    <div>
        <Countdown date={auctionEnd} renderer={renderer}  onComplete={auctionFinished}/>
    </div>
  )
}