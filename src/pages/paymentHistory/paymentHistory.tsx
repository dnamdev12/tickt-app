import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import storageService from '../../utils/storageService';
import dummy from '../../assets/images/u_placeholder.jpg';
import searchIcon from '../../assets/images/main-search.png';
import more from '../../assets/images/icon-direction-right.png';
import loader from '../../assets/images/loader.gif';
import noData from '../../assets/images/no-search-data.png';
import moment from 'moment';
import { renderTime } from '../../utils/common';
import { debounce } from 'lodash';
interface Props {
  isLoading: boolean,
  searching: boolean,
  paymentHistory: any;
  paymentDetails: Array<any>;
  getPaymentHistory: (page: number, search: string, init: boolean) => void;
  getPaymentDetails: (jobId: string) => void;
}

const PaymentHistory = ({
  isLoading,
  searching,
  paymentHistory,
  paymentDetails,
  getPaymentHistory,
  getPaymentDetails,
}: Props) => {
  const history = useHistory();
  const { search } = useLocation();

  const [jobId, setJobId] = useState<string | null>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const jobId = urlParams.get('jobId');
    setJobId(jobId);

    if (!jobId) {
      getPaymentHistory(1, '', true);
    } else {
      getPaymentDetails(jobId);
    }
  }, [search, getPaymentHistory, getPaymentDetails]);

  const searchPayementHistory = useCallback(debounce((searchQuery) => getPaymentHistory(1, searchQuery, false), 1000), []);

  const handleSearch = ({ target: { value } }: any) => {
    setSearchQuery(value);
    searchPayementHistory(value);
  };

  const userType = storageService.getItem('userType');
  const { totalEarnings = 0, totalJobs = 0, revenue = {} } = paymentHistory || {};
  const { revenueList = [] } = revenue;
  const { status, tradeId, specialization, tradieId, tradieName, tradieImage, builderId, builderName, builderImage, jobName, from_date, to_date, totalEarning, review, rating, milestones = [] }: any = paymentDetails || {};

  if (isLoading) {
    return null;
  }

  return jobId ? (
    <div className="app_wrapper">
      <div className="section_wrapper">
        <div className="custom_container">
          <div className="revenue_detail">
            <div className="flex_row">
              <div className="flex_col_sm_8">
                <button className="back" onClick={() => history.goBack()}></button>
                <ul className="total_count_card">
                  <li>
                    <div className="flex_row center_flex">
                      <div className="flex_col_sm_7">
                        <div className="img_txt_wrap">
                          <figure className="job_img">
                            <img src={(userType === 1 ? builderImage : tradieImage) || dummy} alt="job-img" />
                          </figure>
                          <div className="details">
                            <span className="inner_title">
                              {jobName}
                            </span>
                            <span className="show_label">{status === 'Active' ? <label>{status}</label> : renderTime(from_date, to_date, 'MM-DD-YYYY')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex_col_sm_5 text-right">
                        <span className="sub_title">{totalEarning}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div>
                  <ul className="milestones_check payment_check">
                    {milestones.map(({ _id, milestone_name, milestoneEarning, isPhotoevidence, from_date, to_date, status }: any) => (
                      <li
                        key={_id}
                        className={status !== 'Pending' ? 'check' : 'disabled'}
                      >
                        <div className="circle_stepper">
                          <span></span>
                        </div>
                        <div className="f_spacebw">
                          <div className="info">
                            <label>{milestone_name}</label>
                            {isPhotoevidence && (
                              <span>Photo evidence required</span>
                            )}
                            <span>
                              {renderTime(from_date, to_date)}
                            </span>
                          </div>
                          <span className="xs_sub_title">{milestoneEarning}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex_col_sm_4 col_ruler">
                <span className="sub_title">{userType === 1 ? 'Posted by' : 'Tradie'}</span>
                <div className="tradie_card posted_by view_more ">
                  {/* <a href="javascript:void(0)" className="chat circle"></a> */}
                  <div className="user_wrap" onClick={() => history.push(`/${userType === 1 ? 'builder' : 'tradie'}-info?${userType === 1 ? 'builder' : 'trade'}Id=${userType === 1 ? builderId : tradieId}`)}>
                    <figure className="u_img">
                      <img src={(userType === 1 ? builderImage : tradieImage) || dummy} alt="img" />
                    </figure>
                    <div className="details">
                      <span className="name">{userType === 1 ? builderName : tradieName}</span>
                      <span className="rating">{rating || 0}, {review || 0} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="relate">
                  <span className="sub_title">Job details</span>
                  <span className="edit_icon" title="More" onClick={() => history.push(`/job-details-page?jobId=${jobId}${userType === 1 ? `&tradeId=${tradeId}&specializationId=${specialization?.[0]}` : ''}`)}>
                    <img src={more} alt="more" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="app_wrapper">
      <div className="section_wrapper">
        <div className="custom_container">
          <div className="relate">
            <button className="back" onClick={() => history.goBack()}></button>
            <span className="title">{userType === 1 ? 'Payment history' : 'Transaction history'}</span>
          </div>
          <ul className="total_count_card">
            <li className="revenue">
              <span className="show_label">{userType === 1 ? 'Total earnings' : 'Total payment sent'}</span>
              <span className="title">${totalEarnings}</span>
            </li>
            <li className="job">
              <span className="show_label">Total Jobs</span>
              <span className="title">{totalJobs}</span>
            </li>
          </ul>
          <div className="flex_row center_flex">
            <div className="flex_col_sm_2">
              <span className="xs_sub_title mb0">Last jobs</span>
            </div>
            <div className="flex_col_sm_4">
              <div className={`search_bar${searchActive ? ' active' : ''}`}>
                <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
                <span className="detect_icon_ltr" onClick={() => setSearchActive(true)}>
                  <img src={searchIcon} alt="search" />
                </span>
              </div>
            </div>
          </div>
          <div className="last_jobs">


            <div className="table_wrap">
              <table cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                    <th><span className="form_label">Job</span></th>
                    <th><span className="form_label">Status</span></th>
                    <th> <span className="form_label">Hired {userType === 1 ? 'by' : 'tradie'}</span></th>
                    <th><span className="form_label">Date</span></th>
                    <th> <span className="form_label">Price</span></th>
                  </tr>
                </thead>
                <tbody>
                  {searching ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="no_record">
                          <img src={loader} alt="loader" width="130px" />
                        </div>
                      </td>
                    </tr>
                  ) : !revenueList?.length ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="no_record">
                          <figure className="no_img">
                            <img src={noData} alt="data not found" />
                          </figure>
                          <span>No Data Found</span>
                        </div>
                      </td>
                    </tr>
                  ) : revenueList.map(({ _id, jobId, status, jobName, tradieName, tradieImage, tradeName, builderName, builderImage, from_date, earning }: any) => (
                    <tr key={_id}>
                      <td>
                        <div className="img_txt_wrap">
                          <figure className="job_img">
                            <img src={(userType === 1 ? builderImage : tradieImage) || dummy} alt="job-img" />
                          </figure>
                          <div className="details" onClick={() => { history.push(`/payment-history?jobId=${jobId}`); }}>
                            <span className="inner_title line-2">
                              {tradeName}
                            </span>
                            <span className="xs_head line-1">
                              {jobName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td><span className="inner_title line-3">{status}</span></td>
                      <td><span className="inner_title line-3">{userType === 1 ? builderName : tradieName}</span></td>
                      {/* <td><span className="inner_title">{moment(from_date).format('DD.MM.YYYY')}</span></td> */}
                      <td><span className="inner_title">{renderTime(from_date, to_date)}</span></td>
                      <td><span className="inner_title">{earning}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            {/* <div className="flex_row">
              <div className="flex_col_sm_3">
                <span className="form_label">Job</span>
              </div>
              <div className="flex_col_sm_2">
                <span className="form_label">Status</span>
              </div>
              <div className="flex_col_sm_3">
                <span className="form_label">Hired {userType === 1 ? 'by' : 'tradie'}</span>
              </div>
              <div className="flex_col_sm_2">
                <span className="form_label">Date</span>
              </div>
              <div className="flex_col_sm_2">
                <span className="form_label">Price</span>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
