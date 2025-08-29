import { Button } from "./Button"
import { Card } from "./Card"
import { InfoStack } from "./InfoStack"
import { DialogTrigger } from "./NextjsEventHandlerCompliance/DialogTrigger"
import DialogTerminal from "./DialogContent/DialogTerminal"
import { LongArrowRight } from "./Arrow"

export const Features = () => {
    return (
        <div className="hidden md:flex flex-col w-[90%] md:w-[85%] gap-4 mt-5 md:mt-20">
        <h1 className="mx-8">A Smarter, Safer Way to Operate.</h1>
        <Card className="flex w-full gap-x-2">
          <InfoStack className="flex flex-col justify-between gap-y-4">
            <h2 className="w-[90%]">The DevOps Perception Layer</h2>
            <p className="body-3 w-[95%]">Deeply understands your operational environment. 
              It sees your Docker containers, Kubernetes pods, and systemd services 
              to generate hyper-relevant plans.</p>
              <DialogTrigger content={<DialogTerminal/>}>
                <Button className="rounded-3xl"><LongArrowRight/></Button>
              </DialogTrigger>
          </InfoStack>
          <InfoStack className="flex flex-col justify-between gap-y-4">
            <h2 className="w-[90%]">Safety-First Planning Layer</h2>
            <p className="body-3 w-[95%]">Our core philosophy. Every action is first presented 
              as a clear, human-readable plan. You see the exact commands before they 
              run. You are always in command.</p>
              <DialogTrigger content={<DialogTerminal/>}>
                <Button className="rounded-3xl"><LongArrowRight/></Button>
              </DialogTrigger>
          </InfoStack>
          <InfoStack className="flex flex-col justify-between gap-y-4">
            <h2 className="w-[90%]">The Open Execution Layer</h2>
            <p className="body-3 w-[95%]">We are Switzerland. Bring your own AI model; 
              OpenAI, Claude, Llama 3, or plug directly into your enterprise&apos;s 
              secure cloud instance. No vendor lock-in.</p>
              <DialogTrigger content={<DialogTerminal/>}>
                <Button className="rounded-3xl"><LongArrowRight/></Button>
              </DialogTrigger>
          </InfoStack>
        </Card>
      </div>
    )
}