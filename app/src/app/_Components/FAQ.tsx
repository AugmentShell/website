"use client"

import { Card } from "./Card"
import FramerTerminal from "../_Animations/FramerTerminal"
import { mixedErrors, mixedSuccess, fullSuccess } from "../_Animations/messages"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import type { ComponentProps } from "react";

type LinesProp = ComponentProps<typeof FramerTerminal>["linesToType"];

export const FAQ = () => {

    const [message, setMessage] = useState<LinesProp | null>(null)

    const changeTerminal = (newMessage :LinesProp) => {
        if(newMessage){
            setMessage(newMessage)
        }
    }

    return(
        <div className="flex flex-col gap-4 w-[90%] items-center md:items-start md:w-[85%] mt-5 md:mt-20">
        <h1 className="md:mx-8  w-full">Frequently Asked Questions</h1>
        <div className="flex justify-around w-full">
          <div className="flex flex-col gap-12 w-[47%]">
            <Card onClick={() => {changeTerminal(mixedErrors)}} className="flex justify-between items-center w-full "><h2 className="w-[80%]">How do we get started?</h2><ChevronRight/></Card>
            <Card onClick={() => {changeTerminal(mixedSuccess)}} className="flex justify-between items-center w-full "><h2 className="w-[80%]">Can we really trust AI agents to accomplish tasks?</h2><ChevronRight/></Card>
            <Card onClick={() => {changeTerminal(fullSuccess)}} className="flex justify-between items-center w-full "><h2 className="w-[80%]">What platforms do you currently support?</h2><ChevronRight/></Card>
          </div>
          <div className="w-[48%]">
            {message && <FramerTerminal linesToType={message} className="[--panel-h:100%]"/>}
          </div>
        </div>
      </div>
    )
}

