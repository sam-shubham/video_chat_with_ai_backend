import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SecureWrapper = ({ children }) => {
  const [AccessGrated, setAccessGrated] = useState(false);
  var router = useRouter();
  useEffect(() => {
    if (
      localStorage.getItem("currentTgAdvbt28pass") ||
      router.pathname == "/LoginPage"
    ) {
      setAccessGrated(true);
      if (localStorage.getItem("currentTgAdvbt28pass")) {
        axios
          .post("/api/AdminLogin", {
            pass: localStorage.getItem("currentTgAdvbt28pass"),
          })
          .then(({ data: axres }) => {
            if (!axres.success) {
              localStorage.removeItem("currentTgAdvbt28pass");
              router.push("/LoginPage");
              toast.error("Check Credentials Again");
            }
          });
      }
    } else {
      router.push("/LoginPage");
    }
  }, [router.pathname]);

  return AccessGrated ? children : <div></div>;
};

export default SecureWrapper;
