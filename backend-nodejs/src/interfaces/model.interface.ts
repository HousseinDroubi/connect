interface createUserAccountBodyInterface {
  email: string;
  username: string;
  pin: number;
  password: string;
}

interface userModelInterface extends createUserAccountBodyInterface {
  profile_url: string;
  is_verified?: boolean;
  created_at?: Date;
}

export { userModelInterface };
