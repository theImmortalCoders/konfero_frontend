import {UseQueryResult} from "react-query";
import {GetAllUsersData, verifyUser} from "@/hooks/user";
import {Box} from "@/components/common/Box/Box";
import Image from "next/image";
import {useCallback} from "react";

type props = {
  userData: GetAllUsersData,
  refetchUsers: () => Promise<UseQueryResult>,
}


const ManageSingleUser = ({userData, refetchUsers}: props) => {

  const handleVerifyUser = useCallback(async () => {
    try {
      const response = await verifyUser(userData.id);
      if (response === 200) await refetchUsers();
    } catch (error) {
      console.log(error);
    }
  },[])

  return(
    <Box className="flex flex-col xs:min-w-64 w-min gap-y-4 items-center xs:items-start text-xs xs:text-base">
      <div>
        <p className="font-bold xs:text-nowrap">{userData.username}</p>
        <p className="xs:text-nowrap">{userData.email}</p>
      </div>
      <div className="flex flex-col xs:flex-row gap-4 w-full justify-between items-center">
        <Image
          src={userData.photo}
          className="w-16 h-16 rounded-full"
          width={256}
          height={256}
          alt="użytkownik"
        />
        <div className="w-min xs:self-end">
          {
            !userData.verified?
              <button
                className="border-2 border-darkblue shadow-darkblue shadow-sm rounded-2xl px-2 hover:bg-darkblue hover:text-close2White"
                onClick={handleVerifyUser}
              >
                Zweryfikuj
              </button>
              :
              <p className="font-bold text-center" >
                Użytkownik zweryfikowany
              </p>
          }
        </div>
      </div>
    </Box>
  )
}

export default ManageSingleUser;