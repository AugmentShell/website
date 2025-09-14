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
        <Carousel className="h-fit">
          <InfoStack className="flex flex-col items-center gap-y-4 px-4 w-full mb-2">
            <h2 className="w-fit">The DevOps Perception Layer</h2>
            <p className="body-2">
              AugmentShell sees your system like a seasoned SRE. It automatically detects your containers, 
              Kubernetes context, cloud configurations, and systemd services to generate plans with surgical precision.
            </p>
          </InfoStack>

          <InfoStack className="flex flex-col items-center gap-y-4 px-4 w-full mb-2">
            <h2 className="w-fit">Safety-First Planning Layer</h2>
            <p className="body-2">
              Our non-negotiable promise. Every action is first proposed as a 
              clear, auditable plan. You see the exact commands before they run and must give explicit approval. 
              No black boxes. No surprises.
            </p>
          </InfoStack>

          <InfoStack className="flex flex-col items-center gap-y-4 px-4 w-full mb-2">
            <h2 className="w-fit">The Open Execution Layer</h2>
            <p className="body-2">
              We are not another walled garden. Bring your preferred AI model, such as OpenAI,
              Claude, or a local Llama 3 instance. We provide the universal, safety-first 
              chassis for the engine of your choice.
            </p>
          </InfoStack>
        </Carousel>
      </Card>
    </div>
  )
}