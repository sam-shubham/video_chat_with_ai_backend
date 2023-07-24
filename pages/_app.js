import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import SecureWrapper from "@/components/SecureWrapper";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  var router = useRouter();
  return (
    <>
      <SecureWrapper>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
        />
        <div className="flex w-full">
          {router.pathname != "/LoginPage" ? (
            <>
              <div className="fixed z-[10]">
                <Sidebar />
              </div>
              <div className="/w-[10rem] h-[100vh] block w-0 md:w-[6rem]"></div>
            </>
          ) : (
            <></>
          )}

          <div className="w-full">
            <Component {...pageProps} />
          </div>
        </div>
      </SecureWrapper>
    </>
  );
}
