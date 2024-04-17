import SingleFormInput from "@/components/common/Input/SingleFormInput";
import { useState } from "react";

export default function AddLectureInputs() {

    const [name, setName] = useState<string>("");

    return (
        <>
            <div className="relative">
              <SingleFormInput
                  type="text"
                  id="name"
                  name="companyName"
                  placeholder=" "
                  value={name}
                  onChange={(e) => {
                      const value = e.target.value;
                      const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,100}$/i.test(value);
            
                      if (isValid) {
                        setName(value);
                      }
                  }}
              />
              <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                  Nazwa
              </label>
            </div> 
        </>
    );
}