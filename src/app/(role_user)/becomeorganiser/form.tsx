import { Box } from "@/components/common/Box/Box"
import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from "next/image";
import Logo from "@/assets/logo/blue/logo_text_blue.png";

function OrganiserFormInput ({
    type,
    id,
    name,
    placeholder,
    value,
    onChange
  }: {
    type: string;
    id: string;
    name: string;
    placeholder?: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  }) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border-b border-blue py-1 focus:outline-none focus:border-darkblue focus:border-b-2 bg-close2White transition-colors peer placeholder-transparent"
            autoComplete="off"
            required
        />
    )
}

function CompanyNameInput () {
    const [CompanyName, setCompanyName] = useState<string>("");
    return (
        <div className="relative">
            <OrganiserFormInput
                type="text"
                id="name"
                name="companyName"
                value={CompanyName}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid =  /^[\w\s\/\d\W]{0,100}$/i.test(value);
          
                    if (isValid) {
                      setCompanyName(value);
                    //   console.log(value);
                    }
                }}
            />
            <label htmlFor="name" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Nazwa firmy</label>
        </div>    
    )
}

function AddressInput () {
    const [address, setAddress] = useState<string>("");
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^[a-zA-Z\s\/\d]{0,100}$/.test(value);
          
                    if (isValid) {
                      setAddress(value);
                    //   console.log(value);
                    }
                }}
            />
            <label htmlFor="address" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Adres</label>
        </div>
    )
}

function CityInput () {
    const [cityName, setCityName] = useState<string>("");
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="city"
                name="city"
                value={cityName}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^[a-zA-Z\s]{0,30}$/.test(value);
          
                    if (isValid) {
                      setCityName(value);
                    //   console.log(value);
                    }
                }}
            />
            <label htmlFor="city" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Miasto</label>
        </div>
    )
}

function PhoneNumberInput () {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="phone"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^\d{0,9}$/.test(value);
          
                    if (isValid) {
                      setPhoneNumber(value);
                    //   console.log(value);
                    }
                }}
            />
            <label htmlFor="phone" className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 text-blue peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">Numer telefonu</label>
        </div>
    )
}

export default function BecomeOrganiserForm ({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {

    const submitForm  = async () => {
        
    };

    return (
        <div className="fixed flex items-center justify-center inset-0 z-10">
            <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-close2White opacity-10"></div>
            <Box className="flex flex-col justify-center items-center w-5/6 xs:w-auto text-darkblue space-y-6 z-20">
                <Image src={Logo} alt="Logo" className="w-36 md:w-48"/>
                <p className="text-center font-bold">Podaj dane, aby uzyskać status organizatora</p>
                    <div className="flex flex-col w-full h-fit space-y-6">
                        <CompanyNameInput/>
                        <AddressInput/>
                        <CityInput/>
                        <PhoneNumberInput/>
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-center font-bold">Zatwierdź dane i poczekaj na rozpatrzenie prośby</p>
                            <button onClick={submitForm} className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl ">Zatwierdź</button>
                        </div>
                    </div>
            </Box>
        </div>
    )
}