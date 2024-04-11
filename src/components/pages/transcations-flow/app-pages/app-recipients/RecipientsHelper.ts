import { queryClient } from "index";
import { useMutation } from "react-query";
import { toastAction } from "redux/actions/actions";
import store from "redux/store";
import endpoints from "util/endpoints";
import { postRequest } from "util/http";
import { parseEndpointParameters } from "../../../../../util/util";

export const useCreateRecipient = (onSuccess: Function) => {
  const user = store.getState().auth.user;
  const transfer = store.getState().transfer;

  const userId = user.id;

  return useMutation(
    (values: any) => {
      values = {
        firstName: values.firstName,
        lastName: values.lastName,
        profile: {
          ...values,
          remittanceHandler: transfer.remittanceHandler,
        },
      };
      return postRequest(
        { ...values },
        parseEndpointParameters(endpoints.CREATE_RECIPIENT, userId),
        "Failed to to create recipient, Pls try again"
      );
    },
    {
      onSuccess: () => {
        toastAction({
          show: true,
          type: "success",
          message: "New recipient added",
        });
        queryClient.invalidateQueries(
          parseEndpointParameters(endpoints.RECIPIENTS, userId)
        );
        onSuccess();
      },
    }
  );
};
