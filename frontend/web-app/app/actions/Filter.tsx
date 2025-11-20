import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButton = [4 ,8 , 12]
const orderButtons = [
    { label: 'Alphabetical', icon: AiOutlineSortAscending, value: 'make'},
    { label: 'End Date', icon: AiOutlineClockCircle, value: 'endDate'},
    { label: 'Recently added', icon: BsFillStopCircleFill, value: 'new'},
]
const filterButtons = [
    { label: 'Live auctions', icon: GiFlame, value: 'live'},
    { label: 'End < 6 hours', icon: GiFinishLine, value: 'endDate'},
    { label: 'Completed', icon: BsStopwatchFill, value: 'finished'},
]
export default function Filter() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy)
  return (
    <div className="flex justify-between items-center mb-4">
        <div>
             <span className="uppercase text-sm text-grey-500 mr-2">
                Filter by
            </span>
            <ButtonGroup>
                {filterButtons.map(({label, icon: Icon, value}) => (
                    <Button
                        key={value}
                        onClick={() => setParams({filterBy : value})}
                        color ={`${filterBy === value ? 'red': 'grey'}`}
                        className="focus:ring-0"
                    >
                        <span className="mr-3 flex h-4 w-4 items-center justify-center">
                            <Icon size={16} />
                        </span>
                        {label}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
        <div>
             <span className="uppercase text-sm text-grey-500 mr-2">
                Order by
            </span>
            <ButtonGroup>
                {orderButtons.map(({label, icon: Icon, value}) => (
                    <Button
                        key={value}
                        onClick={() => setParams({orderBy : value})}
                        color ={`${orderBy === value ? 'red': 'grey'}`}
                        className="focus:ring-0"
                    >
                        <span className="mr-3 flex h-4 w-4 items-center justify-center">
                            <Icon size={16} />
                        </span>
                        {label}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
        <div>
            <span className="uppercase text-sm text-grey-500 mr-2">
                Page Size
            </span>
            <ButtonGroup>
                {pageSizeButton.map((value, index) => (
                    <Button
                        key={index}
                        onClick={() => setParams({pageSize : value})}
                        color ={`${pageSize === value ? 'red': 'grey'}`}
                        className="focus:ring-0"
                    >
                        {value}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    </div>
  )
}
