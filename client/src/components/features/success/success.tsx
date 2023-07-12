import { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";
import { removeAndAdd } from "../../../services/userService";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Success = () => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const userValue = Cookies.get("user");
  const userId: string = JSON.parse(userValue);

  const queryClient = useQueryClient();

  const removeCart = useQuery(["removeCart"], {
    queryFn: () => {
      return removeAndAdd(userId);
    },
  });

  if (removeCart.isSuccess) {
    queryClient.refetchQueries(["user"]);
    queryClient.invalidateQueries(["removeCart"]);
  }

  useEffect(() => {
    setIsAnimationActive(true);

    return () => {
      setIsAnimationActive(false);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center rounded-lg bg-green-100 px-6 py-8 text-green-700">
      {isAnimationActive && <Confetti active />}
      <svg
        className="mb-4 h-16 w-16 text-green-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8.828 14.586l-3.829-3.828L6.243 9 8 10.757l5.586-5.586L15.172 5l-7 7z"
          clipRule="evenodd"
        />
      </svg>
      <h3 className="mb-2 text-center text-3xl font-semibold">
        התשלום בוצע בהצלחה
      </h3>
      <p className="text-center text-lg">
        ברכותינו! התשלום שלך בוצע בהצלחה... תודה לך ומקווים שנתראה שוב
      </p>
    </div>
  );
};

export default Success;
