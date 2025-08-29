import { Button } from "./_Components/Button";
import { Card } from "./_Components/Card";
import { InfoStack } from "./_Components/InfoStack";
import { Navbar } from "./_Components/Navbar";
import TerminalWindow from "./_Components/TerminalWindow";
import { LongArrowRight } from "./_Components/Arrow"
import { DialogTrigger } from "./_Components/NextjsEventHandlerCompliance/DialogTrigger";
import DialogTerminal from "./_Components/DialogContent/DialogTerminal";
import { ContactForm } from "./_Components/DialogContent/ContactForm";
import Image from "next/image";
import { FAQ } from "./_Components/FAQ";
import { MobileFAQ } from "./_Components/MobileFAQ";
import { Features } from "./_Components/Features";
import { MobileFeatures } from "./_Components/MobileFeatures";

export default function Home() {

  return (
    <>
      <Navbar/>

      <TerminalWindow className="mt-[-16px]"/>

      <div className="flex flex-col items-center gap-y-5 md:gap-y-10 mt-5 md:mt-20">
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

      <Features/>
      <MobileFeatures/>

      <FAQ/>
      <MobileFAQ/>

      <Card className="flex flex-col items-center w-[85%] mt-5 md:mt-20">
        <h1 className="mb-4 text-center">Stop Fighting Fires. Start Commanding Them.</h1>
        <p className="body-1 mb-8 md:mb-16">Whether you’re starting up or it’s all going down. AugmentShell is here.</p>
        <DialogTrigger content={<ContactForm/>}>
          <Button variant="link"><h2>Join For Updates</h2></Button>
        </DialogTrigger>
      </Card>

      <Card className="my-4 md:my-12">
          <Image
            src="/logo-clear-background.svg"
            alt="Augment Shell"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-[80vw]"
          />
      </Card>

    </>
  );
}