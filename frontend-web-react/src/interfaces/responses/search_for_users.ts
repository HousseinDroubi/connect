interface searchForUsersResponseInterface {
  users: Array<{
    _id: string;
    pin: string;
    profile_url: string;
    username: string;
  }>;
}

export { searchForUsersResponseInterface };
