import { useQuery } from "@tanstack/react-query";
import { loginResponseInterface } from "../../../interfaces/responses/login_response";

const useUserData = () =>
  useQuery<loginResponseInterface | null>({
    queryKey: ["user_data"],
    queryFn: () => null,
    staleTime: Infinity,
  });

export default useUserData;
