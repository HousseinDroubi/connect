import { generateToken } from "../functions/general";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { loginResponseInterface } from "../interfaces/responses/auth.controller.responses.interfaces";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";

const getUserData = async ({
  user,
}: userDocumentInterface): Promise<loginResponseInterface> => {
  const conversations: any = await Conversation.find({
    $and: [
      {
        $or: [{ between: null }, { between: { $in: [user!._id] } }],
      },
      {
        deleted_for: { $nin: [user!._id] },
      },
    ],
  })
    .populate({
      path: "between",
      select: "_id profile_url username pin",
    })
    .select("-deleted_for -__v")
    .populate("last_message")
    .lean();

  for (let index = 0; index < conversations.length; index++) {
    const recipient: any =
      conversations[index].between === null
        ? null
        : String(conversations[index].between[0]._id) == String(user!._id)
        ? conversations[index].between[1]
        : conversations[index].between[0];

    if (recipient)
      recipient.profile_url = `http://${process.env.DOMAIN}:${process.env.PORT}/${recipient.profile_url}`;

    const last_message: any = await Message.findOne({
      conversation_id: conversations[index]._id,
      $or: [{ receiver: user!._id }, { receiver: null }, { sender: user!._id }],
      deleted_for: { $nin: [user!._id] },
    })
      .select("-deleted_for -__v")
      .sort({ created_at: -1 })
      .lean();

    if (last_message) {
      last_message.deleted = last_message.deleted_for_others_at !== null;
      delete last_message.deleted_for_others_at;
    }

    conversations[index].recipient = recipient;
    conversations[index].last_message = last_message;
    delete conversations[index].between;
  }

  conversations.sort((a: any, b: any) => {
    if (!a.last_message && !b.last_message) return 0;
    if (!a.last_message) return 1;
    if (!b.last_message) return -1;

    return (
      new Date(b.last_message.created_at).getTime() -
      new Date(a.last_message.created_at).getTime()
    );
  });

  const response_json: loginResponseInterface = {
    result: "logged_in",
    _id: user!._id,
    email: user!.email,
    username: user!.username,
    pin: user!.pin,
    profile_url: `http://${process.env.DOMAIN}:${process.env.PORT}/${
      user!.profile_url
    }`,
    token: generateToken(user!._id),
    is_online: user!.is_online,
    conversations: conversations,
  };

  return response_json;
};

export { getUserData };
