export const Navbar = () => {
  return <nav className=" h-16 w-full card flex px-6 lg:px-24 justify-between">

    {/* Logo container */}

    <div className="basis-12/12 md:basis-5/12 lg:basis-4/12">
        <img src={"/logo-clear-background.svg"}
        alt="Augment Shell"
        className="h-full w-auto"/>
    </div>

    {/* Nav Buttons container */}

    <div className="hidden md:flex md:basis-5/12">

        <ul className="flex h-full w-full items-center nav-text justify-between underline">
            <li><a>preview</a></li>
            <li><a>features</a></li>
            <li><a>faq</a></li>
            <li><a>join</a></li>
        </ul>

    </div>

  </nav>;
};