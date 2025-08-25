import { Button } from "./_Components/Button";
import { Card } from "./_Components/Card";
import { InfoStack } from "./_Components/InfoStack";
import { Navbar } from "./_Components/Navbar";
import TerminalWindow from "./_Components/TerminalWindow";

export default function Home() {
  return (
    <>
      <Navbar/>
      <TerminalWindow/>
      <Card className="flex flex-col items-center w-[80%]">
        <h1 className="mb-4">The SRE partner for when your servers are on fire.</h1>
        <p className="body-2 w-[90%] md:w-[80%]">AugmentShell is a safety-first, AI-native Execution Agent for your
          terminal. Turning the chaos of incident response into clear,
          transparent, and approved plans.</p>
      </Card>
      <Button><h2>Join for Updates</h2></Button>
      <div className="flex flex-col w-[90%] md:w-[80%] gap-4">
        <h1 className="mx-8">A Smarter, Safer Way to Operate.</h1>
        <Card className="flex w-full gap-x-2">
          <InfoStack>
            <h2>The DevOps Perception Layer</h2>
            <p className="body-3 w-[95%]">Deeply understands your operational environment. 
              It sees your Docker containers, Kubernetes pods, and systemd services 
              to generate hyper-relevant plans.</p>
          </InfoStack>
          <InfoStack>
            <h2>Safety-First Planning Layer</h2>
            <p className="body-3 w-[95%]">Our core philosophy. Every action is first presented 
              as a clear, human-readable plan. You see the exact commands before they 
              run. You are always in command.</p>
          </InfoStack>
          <InfoStack>
            <h2>The Open Execution Layer</h2>
            <p className="body-3 w-[95%]">We are Switzerland. Bring your own AI model; 
              OpenAI, Claude, Llama 3, or plug directly into your enterprise's 
              secure cloud instance. No vendor lock-in.</p>
          </InfoStack>
        </Card>
      </div>
      <div className="flex flex-col gap-4 w-[90%] md:w-[80%]">
        <h1 className="mx-8">Frequently Asked Questions</h1>
        <div className="flex flex-col gap-12">
          <Card className="w-5/12"><h2>How do we get started?</h2></Card>
          <Card className="w-5/12"><h2>Can we really trust AI agents to accomplish tasks?</h2></Card>
          <Card className="w-5/12"><h2>What platforms do you currently support?</h2></Card>
        </div>
      </div>
      <Card className="flex flex-col items-center">
        <h1 className="w-1/2 mb-4 text-center">Stop Fighting Fires. Start Commanding Them.</h1>
        <p className="body-1 mb-16">Whether you’re starting up or it’s all going down. AugmentShell is here.</p>
        <Button variant="link"><h2>Join For Updates</h2></Button>
      </Card>
      <Card className="my-12">
        <img src={"/logo-clear-background.svg"}
          alt="Augment Shell"
          className="h-auto w-[80vw]"/>
      </Card>
    </>
  );
}
