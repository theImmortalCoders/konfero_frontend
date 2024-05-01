import {useQuery} from "react-query";
import {getAllUsers} from "@/hooks/user";
import ManageSingleUser from "@/components/admindashboard/ManageSingleUser";

const AdminVerifyUser = () => {

  const {
    data: allUserData,
    isLoading: allUserLoading,
    isError: allUserError,
    refetch: allUserRefetch,
  } = useQuery("get all users", getAllUsers)

  return (
    <div className="flex flex-wrap gap-6 justify-center lg:justify-normal">
      {
        !allUserLoading &&
        typeof allUserData !== 'string' ?
          allUserData?.map((userData) => {
            return (
              <ManageSingleUser
                key={userData.id}
                userData={userData}
                refetchUsers={allUserRefetch}
              />
            );
          }) : <div>Ładowanie...</div>
      }
    </div>
  );
}

export default AdminVerifyUser;