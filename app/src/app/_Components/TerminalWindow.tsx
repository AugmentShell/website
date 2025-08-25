"use client"


import { useState } from 'react';
import { mixedErrors,mixedSuccess,fullError,fullSuccess,warningMix } from "../_Animations/messages"
import TerminalTyper from '../_Animations/TerminalTyper';
import { Button } from './Button';


export default function TerminalWindow() {

  const [erase, setErase] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className='flex flex-col items-center'>
  
    <div className="h-[75vh] w-[80vw] bg-[#2a2b2a] border-8 border-black rounded">

      <div className="body-2 h-full" >
        {!done && <TerminalTyper
          typingSpeed={2}
          eraseSpeed={1}
          linePause={50}
          eraseTrigger={erase}   // ⬅️ Flip to true to start erasing
          setEraseDone={setDone}
          linesToType={warningMix}
        />}
        {done && <TerminalTyper
          typingSpeed={5}
          eraseSpeed={15}
          linePause={500}
          eraseTrigger={erase}   // ⬅️ Flip to true to start erasing
          setEraseDone={setDone}
          setEraseTrigger={setErase}
          linesToType={mixedSuccess}
        />}
      </div>
      </div>
      {/* on click logic is preventing the button from erasing the second terminal */}
      <Button
        variant={done ? 'default' : 'warning'}
        className='mt-4'
          onClick={() => {if(!done){setErase(true)}}}
        >
          <h3>ACTIVATE AUGMENTSHELL</h3>
        </Button>
        </div>
        
  )
}
