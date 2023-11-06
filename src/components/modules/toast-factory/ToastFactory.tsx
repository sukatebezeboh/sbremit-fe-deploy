import { useSelector } from "react-redux";
import Toast from "./toast/Toast";
import Div from "./ToastFactory.css";

const ToastFactory = () => {
  const toastConfig = useSelector((state: any) => state.toast.toast);
  const toastsConfigs = useSelector((state: any) => state.toast.toasts);

  return (
    <Div id="overall-toast-container" className="overall-toast-container">
      <div className="toast-wrapper">
        {toastConfig.show ? <Toast config={toastConfig} /> : <span></span>}
        {toastsConfigs.map((toastConfig: any) => {
          return toastConfig.show ? (
            <Toast config={toastConfig} />
          ) : (
            <span></span>
          );
        })}
      </div>
    </Div>
  );
};

export default ToastFactory;
