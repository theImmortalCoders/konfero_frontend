import { Box } from "@/components/common/Box/Box"
import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from "next/image";
import Logo from "@/assets/logo/blue/logo_text_blue.png";
import { BecomeOrganizerData, becomeOrganizerWithUpdateData } from "@/hooks/user";

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
    placeholder: string,
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

function CompanyNameInput ({
    companyName,
    setCompanyName
    }: {
    companyName: string;
    setCompanyName: Dispatch<SetStateAction<string>>;
    }) {
    return (
        <div className="relative">
            <OrganiserFormInput
                type="text"
                id="name"
                name="companyName"
                placeholder=" "
                value={companyName}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid =  /^[\w\s\/\d\W]{0,100}$/i.test(value);
          
                    if (isValid) {
                        setCompanyName(value);
                    //   console.log(value);
                    }
                }}
            />
            <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                Nazwa firmy
            </label>
        </div>    
    )
}

function AddressInput ({
    address,
    setAddress
    }: {
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    }) {
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="address"
                name="address"
                placeholder=" "
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
            <label htmlFor="address" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                Adres
            </label>
        </div>
    )
}

function CityInput ({
    city,
    setCity
    }: {
    city: string;
    setCity: Dispatch<SetStateAction<string>>; 
    }) {
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="city"
                name="city"
                placeholder=" "
                value={city}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^[a-zA-Z\s]{0,30}$/.test(value);
          
                    if (isValid) {
                        setCity(value);
                    //   console.log(value);
                    }
                }}
            />
            <label htmlFor="city" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                Miasto
            </label>
        </div>
    )
}

function PhoneNumberInput ({
    phoneNumber,
    setPhoneNumber
    }: {
    phoneNumber: string;
    setPhoneNumber: Dispatch<SetStateAction<string>>; 
    }) {
    return (
        <div  className="relative">
            <OrganiserFormInput
                type="text"
                id="phone"
                name="phoneNumber"
                placeholder=" "
                value={phoneNumber}
                onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^\d{0,9}$/.test(value);
          
                    if (isValid) {
                        setPhoneNumber(value);
                        console.log(value);
                    }
                }}
            />
            <label htmlFor="phone" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                Numer telefonu
            </label>
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

    const [companyName, setCompanyName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const submitForm  = async () => {
        if(!companyName || !address || !city || !phone.trim()) {
            console.error("Wszystkie pola muszą być wypełnione");
            return;
        }
        const organiserData: BecomeOrganizerData = { companyName, address, city, phone };
        const result = await becomeOrganizerWithUpdateData(organiserData);

        if(result !== "Brak autoryzacji użytkownika" && result !== "Wystąpił błąd podczas dodawania wysyłania zapytania o otrzymania roli organizatora"){
            setCompanyName("");
            setAddress("");
            setCity("");
            setPhone("");
        }
        else {
            console.error("Błąd wysyłania zgłoszenia");
        }
    };

    return (
        <div className="fixed flex items-center justify-center inset-0 z-10">
            <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-close2White opacity-10"></div>
            <Box className="flex flex-col justify-center items-center w-5/6 xs:w-auto text-darkblue space-y-6 z-20">
                <Image src={Logo} alt="Logo" className="w-36 md:w-48"/>
                <p className="text-center font-bold">Podaj dane, aby uzyskać status organizatora</p>
                    <div className="flex flex-col w-full h-fit space-y-8">
                        <CompanyNameInput companyName={companyName} setCompanyName={setCompanyName}/>
                        <AddressInput address={address} setAddress={setAddress}/>
                        <CityInput city={city} setCity={setCity}/>
                        <PhoneNumberInput phoneNumber={phone} setPhoneNumber={setPhone}/>
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-center font-bold">Zatwierdź dane i poczekaj na rozpatrzenie prośby</p>
                            <button onClick={submitForm} className="text-nowrap w-fit bg-blue text-close2White text-lg font-medium py-2 px-6 rounded-3xl ">Zatwierdź</button>
                        </div>
                    </div>
            </Box>
        </div>
    )
}