interface wsToggleUserStatusResponseInterface {
  event_name: "toggle_user_status";
  from: string;
  is_online: boolean;
}

type wsResponsesInterface = wsToggleUserStatusResponseInterface;

export default wsResponsesInterface;
