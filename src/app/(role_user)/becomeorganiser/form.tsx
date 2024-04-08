import { Box } from "@/components/common/Box/Box"
import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from "next/image";
import Logo from "@/assets/logo/blue/logo_text_blue.png";

function OrganiserFormInput ({
    type,
    id,
    name,
  }: {
    type: string;
    id: string;
    name: string;
  }) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            className="w-full border-b border-blue py-1 focus:outline-none focus:border-darkblue focus:border-b-2 bg-close2White transition-colors peer"
            autoComplete="off"
            required
        />
    )
}

function CompanyNameInput () {
    return (
        <div className="relative">
            <OrganiserFormInput
                type="text"
                id="name"
                name="name"
            />
            <label htmlFor="name" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Nazwa firmy</label>
        </div>    
    )
}

function PhoneNumberInput () {
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="phone"
                id="phone"
                name="phoneNumber"
            />
            <label htmlFor="phone" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Numer telefonu</label>
        </div>
    )
}

function AddressInput () {
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="address"
                name="address"
            />
            <label htmlFor="address" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Adres</label>
        </div>
    )
}

function FormSubmitButton () {
    return (
        <button type="submit" className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl ">Zatwierdź</button>
    )
}

export default function BecomeOrganiserForm ({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <div className="fixed flex items-center justify-center inset-0 z-10">
            <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-close2Black opacity-100"></div>
            <Box className="flex flex-col justify-center items-center w-5/6 xs:w-auto text-darkblue space-y-4">
                <Image src={Logo} alt="Logo" className="w-36 md:w-48"/>
                <p className="text-center font-bold">Podaj dane, aby uzyskać status organizatora</p>
                <form action="" className="flex flex-col w-full h-fit space-y-6">
                    <CompanyNameInput/>
                    <PhoneNumberInput/>
                    <AddressInput/>
                    <div className="flex flex-col items-center space-y-4">
                        <p className="text-center font-bold">Zatwierdź dane i poczekaj na rozpatrzenie prośby</p>
                        <FormSubmitButton/> 
                    </div>
                </form>
            </Box>
        </div>
    )
}