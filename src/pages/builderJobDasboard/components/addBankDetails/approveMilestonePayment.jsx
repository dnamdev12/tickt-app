import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentSetupForm from './paymentSetupForm';

// call `loadStripe` outside of a component's render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
// const stripePromise = loadStripe('pk_test_51IdTOqKjjnW7jXnVURB0mRIVVZ997twxcbwTmAyc9EDhI60iB05YtmCNOC8ExoEMNO3t7ZBSc8WhqHFZMlzZyDen00cSy6hX4e', {
//   stripeAccount: 'acct_1IdTOqKjjnW7jXnV'
// });

function ApproveMilestonePayment(props) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };
  return (
    <div className="flex_row">
      <div className="flex_col_sm_8">
        <div className="relate">
          <button
            onClick={() => {
              props.backToScreen()
            }}
            className="back"></button>
          <span className={`xs_sub_title`}>
            {props?.jobName}
          </span>
          <div className="form_field">
            <span className="sub_title">
              {'Confirm and pay'}
            </span>
          </div>
          <Elements stripe={stripePromise}>
            <PaymentSetupForm
              isAddnewAccount={props.isAddnewAccount}
              jobName={props.jobName}
              backToScreen={props.backToScreen}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default ApproveMilestonePayment;
