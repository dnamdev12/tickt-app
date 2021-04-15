import { useCallback, useEffect, useState } from 'react';
import PostNewJob from './components/postNewJob';
import JobType from './components/jobType';
import AddLocation from './components/addLocation';
import Payment from './components/payment';
import ChooseTiming from './components/chooseTiming';
import AddMilestone from './components/addMilestone';
import JobMilestones from './components/jobMilestones';
import SaveTemplate from './components/saveTemplate';
import TemplateSavedSuccess from './components/templateSavedSucess';
import JobPostedSuccess from './components/jobPostedSuccess';
import UploadMedia from './components/uploadMedia';
import { callCategories } from '../../redux/postJob/actions';

interface Proptypes {
  callTradeList: () => void;
  tradeListData: Array<any>;
}

// export interface JobData {
//   jobName: string,
//   categories: Array<string>,
//   job_type: Array<string>,
//   specialization: Array<string>,
//   location: object,
//   location_name: string,
//   job_description: string,
//   pay_type: string,
//   amount: string,
//   from_date: string,
//   to_date: string,
//   milestones: Array<string>,
//   urls: string,
// }

const PostJob = ({ callTradeList, tradeListData }: Proptypes) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [step, setStep] = useState(5);
  const [stepsCompleted, setStepsCompleted] = useState<Array<number>>([]);
  const [data, setData] = useState({});

  const getCategories = useCallback(async () => {
    const { categories: categoriesData } = await callCategories();
    setCategoriesData(categoriesData);
  }, []);

  useEffect(() => {
    getCategories();
    callTradeList();
  }, [getCategories, callTradeList]);

  const handleStepComplete = (stepData: any) => {
    setData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
    setStepsCompleted((prevSteps) => prevSteps.concat(step));
    setStep((prevStep) => prevStep + 1);
  };

  const handleStepBack = () => setStep((prevStep) => prevStep - 1);

  let page;
  switch (step) {
    case 1:
      page = (
        <PostNewJob
          data={data}
          stepCompleted={stepsCompleted.includes(1)}
          handleStepComplete={handleStepComplete}
        />
      );
      break;
    case 2:
      page = (
        <JobType
          categories={tradeListData}
          jobTypes={categoriesData}
          data={data}
          stepCompleted={stepsCompleted.includes(2)}
          handleStepComplete={handleStepComplete}
          handleStepBack={handleStepBack}
        />
      );
      break;
    case 3:
      page = (
        <AddLocation
          data={data}
          stepCompleted={stepsCompleted.includes(3)}
          handleStepComplete={handleStepComplete}
          handleStepBack={handleStepBack}
        />
      );
      break;
    case 4:
      page = (
        <Payment
          data={data}
          stepCompleted={stepsCompleted.includes(3)}
          handleStepComplete={handleStepComplete}
          handleStepBack={handleStepBack}
        />
      );
      break;
    case 5:
      page = (
        <ChooseTiming
          data={data}
          stepCompleted={stepsCompleted.includes(3)}
          handleStepComplete={handleStepComplete}
          handleStepBack={handleStepBack}
        />
      );
      break;
    case 6:
      page = (
        <JobMilestones
          data={data}
          stepCompleted={stepsCompleted.includes(3)}
          handleStepComplete={handleStepComplete}
          handleStepBack={handleStepBack}
        />
      );
      break;
    case 7:
      page = <AddMilestone />;
      break;
    case 8:
      page = <SaveTemplate />;
      break;
    case 9:
      page = <TemplateSavedSuccess />;
      break;
    case 10:
      page = <JobPostedSuccess />;
      break;
    case 11:
      page = <UploadMedia />;
      break;
    default:
      page = null;
  }

  return <div>{page}</div>;
};

export default PostJob;
