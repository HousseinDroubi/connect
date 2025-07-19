interface messageComponentInterface {
  is_text: boolean;
  is_left: boolean;
  content: string;
  token: string;
  message_id: string;
  group_user?: {
    profile_url: string;
    username: string;
  };
  is_first_message: boolean;
  is_last_image: boolean;
  is_deleted_for_all: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
