import CartPage from "@/features/cart/ui/CartPage";
import { TopBar } from "@/features/common/components/topbar";

const CartPageRoute = () => {
  return (
    <>
      <TopBar message="장바구니" showShare={false} />
      <div className="mt-20">
        <CartPage />
      </div>
    </>
  );
};

export default CartPageRoute;
