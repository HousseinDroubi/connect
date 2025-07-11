import { queryClient } from "../..";

const updateUserStatus = (new_status: boolean) => {
  queryClient.setQueryData(["user_data"], {
    ...queryClient.getQueryData(["user_data"]),
    is_online: new_status,
  });
};

export { updateUserStatus };
