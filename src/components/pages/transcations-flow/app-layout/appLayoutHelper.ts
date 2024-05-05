import { useQuery } from "react-query";
import { AUTH, RECIPIENTS } from "redux/actionTypes";
import store from "redux/store";
import endpoints from "util/endpoints";
import http, { getRequest } from "util/http";
import { parseEndpointParameters } from "../../../../util/util";
import { signOutAction, toastAction } from "redux/actions/actions";
import { constants } from "util/constants";
import { paths } from "util/paths";

export const checkIsRewardsAvailable = (
  data: any,
  setIsRewardAvailable: Function
) => {
  const { Referral } = data?.referral || {};
  const { Voucher } = data?.meta || {};

  const isVoucherActive = Voucher && Voucher === "ACTIVE";
  const isNewBonusStateActive = Referral && Referral === "ACTIVE";

  if (isVoucherActive || isNewBonusStateActive) {
    return setIsRewardAvailable(true);
  }

  return setIsRewardAvailable(false);
};

export const useUserData = (userId: string) => {
  const customEndpoint = parseEndpointParameters(endpoints.USER, userId);
  return useQuery(customEndpoint, () => getRequest(customEndpoint, ""), {
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: (data) => {
      store.dispatch({
        type: AUTH,
        payload: { ...store.getState().auth, user: data },
      });
    },
    onError: () => {
      toastAction({
        show: true,
        modal: true,
        type: "error",
        title: "Error Occurred",
        message: `An error has ocuured please log out and try again.`,
        extraBtnText: "Logout",
        extraBtnHandler: () => signOutAction(),
      });
    },
  });
};

export const useRecipientsData = (userId: string) => {
  const customEndpoint = parseEndpointParameters(endpoints.RECIPIENTS, userId);
  return useQuery(
    customEndpoint,
    () =>
      getRequest(customEndpoint, "Failed to fetch your recipients infomations"),
    {
      refetchIntervalInBackground: true,
      keepPreviousData: true,
      onSuccess: (data) => {
        store.dispatch({
          type: RECIPIENTS,
          payload: data,
        });
      },
    }
  );
};

export const getTransferRequest = async (
  endpoint: string,
  errMessage: string
) => {
  try {
    const result = await http.get(endpoint);
    if (result?.data?.status === 200 || result?.data?.status === "200") {
      const transfer = result?.data?.data;
      const transferStatus = transfer?.status;
      if (transferStatus === constants.TRANSFER_STATUS_EXPIRED) {
        toastAction({
          show: true,
          modal: true,
          type: "warning",
          title: "Expired",
          message: `This transfer has expired. Please return to dashboard to create a new one.`,
          extraBtnText: "Go to dashboard",
          extraBtnHandler: () => window.location.replace(paths.DASHBOARD),
        });
      }
      return result?.data?.data;
    } else {
      throw new Error(`${errMessage}`);
    }
  } catch (error: any) {
    throw error;
  }
};

export const useGetTransfer = (transferId: string) => {
  const user = store.getState().auth.user;
  const userId = user?.id;
  const endpoint = parseEndpointParameters(
    endpoints.GET_TRANSFER,
    userId,
    transferId
  );
  return useQuery(
    endpoint,
    () =>
      getTransferRequest(
        endpoint,
        "Failed to fetch transactions details, Pls try again"
      ),
    {
      onSuccess: () => {},
    }
  );
};
