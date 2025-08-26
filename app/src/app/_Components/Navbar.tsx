import { Button } from "./Button";

export const Navbar = () => {
  return <nav className=" h-16 w-full card flex px-6 xl:px-24 justify-between">

    {/* Logo container */}

    <div className="basis-12/12 flex justify-center lg:basis-5/12">
        <img src={"/logo-clear-background.svg"}
        alt="Augment Shell"
        className="h-full w-auto"/>
    </div>

    {/* Nav Buttons container */}

    <div className="hidden lg:flex lg:basis-6/12 xl:basis-5/12">

        <ul className="flex h-full w-full items-center nav-text justify-between">
            <Button variant="link"><p className="body-1">preview</p></Button>
            <Button variant="link"><p className="body-1">features</p></Button>
            <Button variant="link"><p className="body-1">faq</p></Button>
            <Button variant="link"><p className="body-1">join</p></Button>
        </ul>

    </div>

  </nav>;
};