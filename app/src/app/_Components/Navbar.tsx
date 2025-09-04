"use client"
import { Button } from "./Button";
import { useDialog } from "./DialogProvider";
import { ContactForm } from "./DialogContent/ContactForm";
import Image from "next/image";

export const Navbar = () => {

  const {openDialog} = useDialog()

  const openContactForm = () => {
    openDialog(<ContactForm></ContactForm>)
  }

  return <>
    <nav className=" h-16 w-full card flex px-6 xl:px-24 justify-between fixed z-[1000]">

    {/* Logo container */}

    <div className="basis-12/12 flex justify-center lg:basis-5/12">
        <Image
          src="/logo-clear-background.svg"
          alt="Augment Shell"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-auto"
        />
    </div>

    {/* Nav Buttons container */}

    <div className="hidden lg:flex lg:basis-6/12 xl:basis-5/12">

        <ul className="flex h-full w-full items-center nav-text justify-between">
            <Button variant="link" scrollToId="preview"><p className="body-1">preview</p></Button>
            <Button variant="link" scrollToId="features"><p className="body-1">features</p></Button>
            <Button variant="link" scrollToId="faq"><p className="body-1">faq</p></Button>
            <Button onClick={openContactForm} variant="link"><p className="body-1">join</p></Button>
        </ul>

    </div>

  </nav>;
  <div className=" hidden md:absolute h-16 w-full "></div>
  </>
};