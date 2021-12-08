import { getStripeClientSecretkey } from '../../../../redux/auth/actions';
import { setShowToast } from '../../../../redux/common/actions';
import { useStripe, useElements, AuBankAccountElement } from '@stripe/react-stripe-js';
import BecsForm from './becsForm';

export default function PaymentSetupForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  //   const stripe = useStripe('stripePublishableKey', {
  //     stripeAccount: 'stripeAccountId',
  //   });

  const handleSubmit = async (e, accountName, accountEmail) => {
    console.log('accountName, accountEmail: ', accountName, accountEmail);
    e.preventDefault();
    if (!stripe || !elements) {
      console.log('Stripe.js has not yet loaded');
      return;
    }

    const auBankAccount = elements.getElement(AuBankAccountElement);
    console.log('auBankAccount', auBankAccount, 'AuBankAccountElement', AuBankAccountElement);

    const res = await getStripeClientSecretkey();


    const result = await stripe.confirmAuBecsDebitPayment(res.stripeClientSecretkey, {
      payment_method: {
        au_becs_debit: props.isAddnewAccount ? auBankAccount : { bsb_number: '000000', account_number: '000123456' },
        // au_becs_debit: { bsb_number: '000000', account_number: '000123456' },
        billing_details: {
          name: accountName,
          email: accountEmail,
        },
      }
    });

    if (result.error) {
      setShowToast(true, result.error.message);
      console.log('submitting bank detail error STRIPE: ', result.error.message);
    } else {
      setShowToast(true, 'Bank Account details added successfully');
      console.log('The PaymentIntent is in the succeeded state', result);
    }
  };

  return (
    <BecsForm
      onSubmit={handleSubmit}
      disabled={!stripe}
      jobName={props.jobName}
      backToScreen={props.backToScreen}
    />
  );
}