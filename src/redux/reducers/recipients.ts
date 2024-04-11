import { IAction } from ".";
import { RECIPIENT, RECIPIENTS } from "../actionTypes";

const initialRecipientState: { recipients: any[]; recipient: any } = {
  recipients: [],
  recipient: {},
};

export const recipients = (
  state: any = initialRecipientState,
  { type, payload }: IAction
) => {
  switch (type) {
    case RECIPIENTS: {
      return {
        ...state,
        recipients: payload && [...payload],
      };
    }
    case RECIPIENT: {
      return {
        ...state,
        recipient: { ...payload },
      };
    }
    default:
      return state;
  }
};
