import InfoPanel from '../../multipurpose/infoPanel.js';
import Spinner from '../../multipurpose/spinner.js';
import { PayPalButton } from 'react-paypal-button-v2';

const PayPalSummary = ({ total, loadingPay, sdkReady, onSuccess }) => {
  return (
    <InfoPanel title="Payment"
      extraClasses="h-full"
      contentClasses="h-full rounded-b-xl sm:rounded-br-xl sm:rounded-bl-none"
      contents={
        (<div className="flex items-center justify-center bg-white py-4 rounded border-2 border-gray-400 z-0" >
          {loadingPay && <Spinner />}
          {!sdkReady ? <Spinner /> :
            <PayPalButton amount={total} onSuccess={onSuccess} shippingPreference="NO_SHIPPING"/>
          }
        </div>)
      }
    />
  )
}

export default PayPalSummary;
