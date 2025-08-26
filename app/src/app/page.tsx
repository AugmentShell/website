import { Button } from "./_Components/Button";
import { Card } from "./_Components/Card";
import { InfoStack } from "./_Components/InfoStack";
import { Navbar } from "./_Components/Navbar";
import TerminalWindow from "./_Components/TerminalWindow";
import { ChevronRight } from "lucide-react";
import { LongArrowRight } from "./_Components/Arrow"
import { DialogTrigger } from "./_Components/NextjsEventHandlerCompliance/DialogTrigger";
import DialogTerminal from "./_Components/DialogContent/DialogTerminal";
import { ContactForm } from "./_Components/DialogContent/ContactForm";

export default function Home() {

  const openTerminalDialog = () => {
    console.log("hello world")
  }

  return (
    <>
      <Navbar/>
      <TerminalWindow/>
      <div className="flex flex-col items-center gap-y-10 mt-5 md:mt-20">
      <Card className="flex flex-col items-center w-[85%]">
        <h1 className="mb-4">The SRE partner for when your servers are on fire.</h1>
        <p className="body-2 lg:w-[80%]">AugmentShell is a safety-first, AI-native Execution Agent for your
          terminal. Turning the chaos of incident response into clear,
          transparent, and approved plans.</p>
      </Card>
      <DialogTrigger content={<ContactForm/>}>
        <Button><h2>Join for Updates</h2></Button>
      </DialogTrigger>
      </div>
      {/* YOU NEED TO GET RID OF THIS HIDDEN CLASS WHEN YOU FIX THIS COMPONENT :) */}
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
              OpenAI, Claude, Llama 3, or plug directly into your enterprise's 
              secure cloud instance. No vendor lock-in.</p>
              <DialogTrigger content={<DialogTerminal/>}>
                <Button className="rounded-3xl"><LongArrowRight/></Button>
              </DialogTrigger>
          </InfoStack>
        </Card>
      </div>
      <div className="flex flex-col gap-4 w-[90%] items-center md:items-start md:w-[85%] mt-5 md:mt-20 ">
        <h1 className="md:mx-8">Frequently Asked Questions</h1>
        <div className="flex flex-col gap-12 md:mx-8 ">
          <Card className="flex justify-between items-center w-full lg:w-5/12"><h2 className="w-[80%]">How do we get started?</h2><ChevronRight/></Card>
          <Card className="flex justify-between items-center w-full lg:w-5/12"><h2 className="w-[80%]">Can we really trust AI agents to accomplish tasks?</h2><ChevronRight/></Card>
          <Card className="flex justify-between items-center w-full lg:w-5/12"><h2 className="w-[80%]">What platforms do you currently support?</h2><ChevronRight/></Card>
        </div>
      </div>
      <Card className="flex flex-col items-center w-[85%] mt-5 md:mt-20">
        <h1 className="mb-4 text-center">Stop Fighting Fires. Start Commanding Them.</h1>
        <p className="body-1 mb-8 md:mb-16">Whether you’re starting up or it’s all going down. AugmentShell is here.</p>
        <DialogTrigger content={<ContactForm/>}>
          <Button variant="link"><h2>Join For Updates</h2></Button>
        </DialogTrigger>
      </Card>
      <Card className="my-4 md:my-12">
        <img src={"/logo-clear-background.svg"}
          alt="Augment Shell"
          className="h-auto w-[80vw]"/>
      </Card>
    </>
  );
}