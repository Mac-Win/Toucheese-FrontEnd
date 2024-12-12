export const PaymentOptions: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-md font-bold">결제 수단</h2>
      <ul>
        <li>
          <input type="radio" name="payment" id="card" />
          <label htmlFor="card">신용/체크카드</label>
        </li>
        <li>
          <input type="radio" name="payment" id="kakaopay" />
          <label htmlFor="kakaopay">카카오페이</label>
        </li>
        <li>
          <input type="radio" name="payment" id="naverpay" />
          <label htmlFor="naverpay">네이버페이</label>
        </li>
        <li>
          <input type="radio" name="payment" id="mobile" />
          <label htmlFor="mobile">휴대폰 결제</label>
        </li>
      </ul>
    </div>
  );
};
