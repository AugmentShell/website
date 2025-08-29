import { Button } from "./Button"
import { Card } from "./Card"
import { InfoStack } from "./InfoStack"
import { DialogTrigger } from "./NextjsEventHandlerCompliance/DialogTrigger"
import DialogTerminal from "./DialogContent/DialogTerminal"
import { LongArrowRight } from "./Arrow"
import Carousel from "./Carousel"

export const MobileFeatures = () => {
  return (
    <div className="flex md:hidden flex-col w-full gap-4 mt-5 items-center">
      <h1 className="mx-8">A Smarter, Safer Way to Operate.</h1>

      <Card className="flex items-center w-[90%] p-0">
        <Carousel>
          <InfoStack className="flex flex-col items-center gap-y-4 px-4 w-full h-[25vh] justify-between">
            <h2 className="w-fit">The DevOps Perception Layer</h2>
            <p className="body-2">
              Deeply understands your operational environment. It sees your Docker containers, Kubernetes pods,
              and systemd services to generate hyper-relevant plans.
            </p>
            <DialogTrigger content={<DialogTerminal />}>
              <Button className="rounded-3xl"><LongArrowRight size={18}/></Button>
            </DialogTrigger>
          </InfoStack>

          <InfoStack className="flex flex-col items-center gap-y-4 px-4 w-full h-[25vh] justify-between">
            <h2 className="w-fit">Safety-First Planning Layer</h2>
            <p className="body-2">
              Our core philosophy. Every action is first presented as a clear, human-readable plan. You see the exact
              commands before they run. You are always in command.
            </p>
            <DialogTrigger content={<DialogTerminal />}>
              <Button className="rounded-3xl"><LongArrowRight size={18} /></Button>
            </DialogTrigger>
          </InfoStack>

          <InfoStack className="flex flex-col items-center gap-y-4 px-4 w-full h-[25vh] justify-between">
            <h2 className="w-fit">The Open Execution Layer</h2>
            <p className="body-2">
              We are Switzerland. Bring your own AI model; OpenAI, Claude, Llama 3, or plug directly into your
              enterprise&apos;s secure cloud instance. No vendor lock-in.
            </p>
            <DialogTrigger content={<DialogTerminal />}>
              <Button className="rounded-3xl"><LongArrowRight size={18}/></Button>
            </DialogTrigger>
          </InfoStack>
        </Carousel>
      </Card>
    </div>
  )
}