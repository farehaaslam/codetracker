import React, { useEffect ,useState} from 'react'
import { useDashboardStore } from '../../store/DashboardStore'
import {  Card} from "../ui/card"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { RotateCcw } from 'lucide-react'


const Target = () => {
    const {currentTarget,getTarget,isEditting,changeTarget,isLoading,setIsEditting}=useDashboardStore();
    const [inputValue,setInputValue]=useState(3)
    useEffect(()=>{
        getTarget();
    },[getTarget])
    function startEditing() {
        setIsEditting(true)
    } 
    async function handleUpdateTarget(){
       let num=Number(inputValue)
       await changeTarget(num)
    }
    async function handleResetToDefault(){
        setInputValue(3)
        console.log(inputValue)
        await changeTarget(3)
        setIsEditting(false)

    }
    function cancelEditing(){
        setIsEditting(false)

    }
  return (
   <div>
    {!isEditting?
     (<div className='flex flex-col items-center justify-center bg-card h-full w-full'>
         <p className="text-m font-semibold ">Current Target</p>
              <p className="text-5xl font-bold text-center  text-red-500 m-1">{currentTarget}</p>
              <p className="text-sm font-semibold ">submissions/day
        </p>
        <Button onClick={startEditing} className="w-full" disabled={isLoading}>
              Update Target
            </Button>


    </div>
    ):(
        <div className="space-y-3">
        <div className="space-y-2">
          <label htmlFor="target-input" className="text-sm font-medium">
            New Target
          </label>
          <Input
            id="target-input"
            type="number"
            placeholder="Enter new target"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min="1"
            max="100"
            className="text-center"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground text-center">Must be between 1 and 100</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleUpdateTarget} disabled={isLoading || !inputValue} className="flex-1">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Target"
            )}
          </Button>
          <Button variant="outline" onClick={cancelEditing} disabled={isLoading}>
            Cancel
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetToDefault}
          disabled={isLoading}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="mr-2 h-3 w-3" />
          Reset to Default (3)
        </Button>
      </div>
    )
}
   </div>
   
  )
}

export default Target