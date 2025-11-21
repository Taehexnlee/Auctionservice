'use client'
import { deleteAuction } from "@/app/actions/actionAution";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string  
}

export default function DeleteButton({id} : Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  function handelDelete() {
    setLoading(true);
    
    deleteAuction(id)
      .then(res => {
        if(res && typeof res === 'object' && 'error' in res) {
          throw (res as { error: { status?: number; message?: string } }).error;
        }
        router.push('/');
      })
      .catch(error => {
        const status = error?.status ?? '';
        const message = error?.message ?? 'Delete failed';
        toast.error(`${status} ${message}`.trim());
      })
      .finally(() => setLoading(false));
  }
  return (
    <Button outline color='red' onClick={handelDelete}>
      {loading && <Spinner size="sm" className="mr-3" />} 
      Delete Auction
    </Button>
  )
}
