interface wsToggleUserStatusResponses {
  event_name: "toggle_user_status";
  from: string;
  is_online: boolean;
}

type wsResponsesInterface = wsToggleUserStatusResponses;

export default wsResponsesInterface;
