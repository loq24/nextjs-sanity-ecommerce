import { useEffect, useContext } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import MetaHead from "components/MetaHead";

const Success = () => {
  const { dispatch } = useContext(CartItemsContext);

  useEffect(() => {
    const removeAllCartItems = () => {
      dispatch({
        type: Types.removeAllItems
      });
    };

    removeAllCartItems();
  }, []);

  return (
    <>
      <MetaHead
        title={"Success"}
        description={
          "Thank you for purchasing! Please note that this shop is in a test mode. "
        }
      />
      <div>
        <p className="text-center text-lg mt-10">
          Thank you for purchasing! Please note that this shop is in a test
          mode.
        </p>
      </div>
    </>
  );
};

export default Success;
