import { Card } from "./Card"
import { InfoStack } from "./InfoStack"

export const Features = () => {
    return (
        <div className="hidden md:flex flex-col w-[90%] md:w-[85%] gap-4 mt-5 md:mt-20">
        <h1 className="mx-8">A Smarter, Safer Way to Operate.</h1>
        <Card className="flex w-full gap-x-2">
          <InfoStack className="flex flex-col justify-between gap-y-8">
            <h2 className="w-[90%]">The DevOps Perception Layer</h2>
            <p className="body-3 w-[95%]">AugmentShell sees your system like a seasoned SRE. It automatically detects your containers, 
              Kubernetes context, cloud configurations, and systemd services 
              to generate plans with surgical precision.</p>
          </InfoStack>
          <InfoStack className="flex flex-col justify-between gap-y-8">
            <h2 className="w-[90%]">Safety-First Planning Layer</h2>
            <p className="body-3 w-[95%]">Our non-negotiable promise. Every action is first proposed as a 
              clear, auditable plan. You see the exact commands before they run and must give explicit approval. 
              No black boxes. No surprises.</p>
          </InfoStack>
          <InfoStack className="flex flex-col justify-between gap-y-8">
            <h2 className="w-[90%]">The Open Execution Layer</h2>
            <p className="body-3 w-[95%]">We are not another walled garden. Bring your preferred AI model—OpenAI,
              Claude, or a local Llama 3 instance. We provide the universal, safety-first chassis for the engine of your choice.</p>
          </InfoStack>
        </Card>
      </div>
    )
}