import { getStripeClientSecretkey, saveStripeTransaction } from '../../../../redux/auth/actions';
import { milestoneAcceptOrDecline } from '../../../../redux/homeSearch/actions';
import { setShowToast } from '../../../../redux/common/actions';
import { useStripe, useElements, AuBankAccountElement } from '@stripe/react-stripe-js';
import BecsForm from './becsForm';
import { useHistory } from 'react-router-dom';
import { moengage } from '../../../../services/analyticsTools';
import { MoEConstants } from '../../../../utils/constants';

export default function PaymentSetupForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  //   const stripe = useStripe('stripePublishableKey', {
  //     stripeAccount: 'stripeAccountId',
  //   });

  const handleSubmit = async (e, accountName, accountEmail) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log('Stripe.js has not yet loaded');
      return;
    }

    const auBankAccount = elements.getElement(AuBankAccountElement);

    const res = await getStripeClientSecretkey({ amount: props.milestoneTotalAmount?.slice(1), tradieId: props.tradieId, builderId: props.builderId });
    if (res.success) {
      const result = await stripe.confirmAuBecsDebitPayment(res.stripeClientSecretkey, {
        payment_method: {
          au_becs_debit: props.isAddnewAccount ? auBankAccount : null,
          // au_becs_debit: { bsb_number: '000000', account_number: '000123456' },
          billing_details: {
            name: accountName,
            email: accountEmail,
          },
        }
      });

      if (result.error) {
        setShowToast(true, 'Milestone payment failed. Please try after some time')
        console.log('STRIPE payment error: ', result.error.message);
      } else {
        setShowToast(true, 'Milestone payment initiated, will take upto 3 business days to settle.');
        const { paymentIntent } = result;
        const data = {
          amount: `${paymentIntent?.amount}`,
          builderId: props.builderId,
          tradieId: props.tradieId,
          transactionId: paymentIntent?.id,
          jobId: props.jobId,
          milestoneId: props.milestoneId,
          status: paymentIntent?.status,
        };
        const res = await saveStripeTransaction(data);
        if (res.success) {
          let data_ = {
            "status": 1,
            "jobId": props.jobId,
            "milestoneId": props.milestoneId,
            "paymentMethodId": 'Bank Account',
            "milestoneAmount": `${props.milestoneAmount?.slice(1)}`,
            "amount": `${paymentIntent?.amount}`,
          }
          moengage.moE_SendEvent(MoEConstants.MADE_PAYMENT, {
            timeStamp: moengage.getCurrentTimeStamp(),
          });
          let response = await milestoneAcceptOrDecline(data_);
          if (response?.success) {
            moengage.moE_SendEvent(MoEConstants.MILESTONE_CHECKED_AND_APPROVED, {
              timeStamp: moengage.getCurrentTimeStamp(),
            });
            history.push('/need-approval-success');
          }
        }
      }
    }
  };

  return (
    <BecsForm
      onSubmit={handleSubmit}
      disabled={!stripe}
      jobName={props.jobName}
      milestoneTotalAmount={props.milestoneTotalAmount}
      backToScreen={props.backToScreen}
    />
  );
}