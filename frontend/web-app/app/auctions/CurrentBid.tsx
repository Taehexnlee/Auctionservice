type Props ={
    amount?: number;
    reservePrice: number;
}

export default function CurrentBid({amount, reservePrice}: Props) {

    let text = 'No bids yet';
    let color = 'bg-red-600';

    if (amount !== undefined) {
        text = '$' + amount;
        color = amount > reservePrice ? 'bg-green-600' : 'bg-amber-600 ';
    }
  return (
    <div className = {`
        border-2 border-white text-white py-1 px-2 rounded-lg  flex
        justify-center ${color}`}>
            {text}
        </div>
  )
}
