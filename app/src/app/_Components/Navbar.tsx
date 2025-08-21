export const Navbar = () => {
  return <nav className=" h-16 w-full card flex px-24 justify-between">

    {/* Logo container */}

    <div className="basis-5/16">
        <img src={"/logo-clear-background.svg"}
        alt="Augment Shell"
        className="h-full w-auto"/>
    </div>

    {/* Nav Buttons container */}

    <div className="basis-7/16">

        <ul className=" flex h-full justify-between items-center body-1 underline">
            <li><a>preview</a></li>
            <li><a>features</a></li>
            <li><a>faq</a></li>
            <li><a>join</a></li>
        </ul>

    </div>

  </nav>;
};