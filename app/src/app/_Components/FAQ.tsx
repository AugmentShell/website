"use client"

import { Card } from "./Card"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

const q1 = "No. Simple wrappers are Information Agents—they give you text. AugmentShell is an Execution Agent. Our power comes from our deep Perception Layer that understands your live system, and our Safety Layer that turns AI suggestions into auditable, approved plans."
const q2 = "This is the core of our philosophy. The AI is never in control; you are. Every action, from a file change to a kubectl apply, must be presented in a clear plan that the human operator explicitly approves. We are a co-pilot, not an autopilot."
const q3 = "AugmentShell is built for the modern DevOps landscape. Our Private Alpha will be focused on Linux environments, with deep integrations for Docker and Kubernetes. Our enterprise plan will support self-hosting in your own private cloud (AWS, GCP, Azure)."


export const FAQ = () => {

    const [message, setMessage] = useState<string | null>(null)

    const changeTerminal = (newMessage : string) => {
        if(newMessage){
            setMessage(newMessage)
        }
    }

    return(
        <div className="hidden md:flex flex-col gap-4 w-[90%] items-center md:items-start md:w-[85%] mt-5 md:mt-20">
        <h1 className="md:mx-8  w-full">Frequently Asked Questions</h1>
        <div className="flex justify-around w-full">
          <div className="flex flex-col gap-12 w-[47%]">
            <Card hoverable onClick={() => {changeTerminal(q1)}} className="flex justify-between items-center w-full cursor-pointer"><h2 className="w-[80%]">Is this just another ChatGPT wrapper?</h2><ChevronRight/></Card>
            <Card hoverable onClick={() => {changeTerminal(q2)}} className="flex justify-between items-center w-full cursor-pointer"><h2 className="w-[80%]">How do you prevent the AI from doing something dangerous?</h2><ChevronRight/></Card>
            <Card hoverable onClick={() => {changeTerminal(q3)}} className="flex justify-between items-center w-full cursor-pointer"><h2 className="w-[80%]">What kind of environments does this work in?</h2><ChevronRight/></Card>
          </div>
          <div className="w-[48%]">
            {message && <Card><p className="body-3">{message}</p></Card>}
          </div>
        </div>
      </div>
    )
}

