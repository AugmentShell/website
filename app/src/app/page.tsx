import { Button } from "./_Components/Button";
import { Card } from "./_Components/Card";
import { Navbar } from "./_Components/Navbar";
import TerminalWindow from "./_Components/TerminalWindow";

export default function Home() {
  return (
    <>
      <Navbar/>
      <TerminalWindow/>
      <Card className="flex flex-col items-center">
        <h1 className="mb-4">The SRE partner for when your servers are on fire.</h1>
        <p className="body-2 w-[90%] md:w-[80%]">AugmentShell is a safety-first, AI-native Execution Agent for your
          terminal. Turning the chaos of incident response into clear,
          transparent, and approved plans.</p>
      </Card>
      <Button><h2>Join for Updates</h2></Button>
      <div className="w-[90%] md:w-[80%] px-4">
        <h1>A Smarter, Safer Way to Operate.</h1>
      </div>
    </>
  );
}
