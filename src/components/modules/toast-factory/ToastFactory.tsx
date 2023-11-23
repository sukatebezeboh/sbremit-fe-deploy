import { useSelector } from "react-redux";
import Toast from "./toast/Toast";
import Div from "./ToastFactory.css";
import { ToastWithActionsButtons } from "./toast/ToastWithActionsButtons";

const ToastFactory = () => {
  const toastConfig = useSelector((state: any) => state.toast.toast);
  const toastsConfigs = useSelector((state: any) => state.toast.toasts);

  return (
    <Div id="overall-toast-container" className="overall-toast-container">
      <div className="toast-wrapper">
        {toastConfig.show ? <Toast config={toastConfig} />: <></>}
        {/* {toastConfig.toastType === "toast-with-confirmation-btns" ? (
          <ToastWithActionsButtons config={toastConfig} />
        ) : (
        )} */}
        {/* {toastsConfigs.map((toastConfig: any, index: number) => {
          return (
            toastConfig.show &&
            toastConfig.defaultThemeName === "CLEAR_MAMBA" && (
              <ToastWithActionsButtons
                key={toastConfig.defaultThemeName + index}
                config={toastConfig}
              />
            )
          );
        })} */}
      </div>
    </Div>
  );
};

export default ToastFactory;
