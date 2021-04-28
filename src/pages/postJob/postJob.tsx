import { useCallback, useEffect, useState } from 'react';
import PostNewJob from './components/postNewJob';
import JobType from './components/jobType';
import AddLocation from './components/addLocation';
import Payment from './components/payment';
import ChooseTiming from './components/chooseTiming';
import ChooseTimingMileStone from './components/chooseTimingMileStone';
import AddMilestone from './components/addMilestone';
import JobMilestones from './components/jobMilestones';
import SaveTemplate from './components/saveTemplate';
import TemplateSavedSuccess from './components/templateSavedSucess';
import JobPostedSuccess from './components/jobPostedSuccess';
import UploadMedia from './components/uploadMedia';
import MileStoneTemplates from './components/milestoneTemplates';
import JobDetails from './components/jobDetails';
import EditMilestone from './components/editMileStone';
import { callCategories } from '../../redux/postJob/actions';

interface Proptypes {
    callTradeList: () => void;
    tradeListData: Array<any>;
    editMilestoneId: number;
    updateMileStoneIndex: (data: number) => void;
}
const PostJob = ({ callTradeList, tradeListData, updateMileStoneIndex, editMilestoneId }: Proptypes) => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [step, setStep] = useState(5);
    const [stepsCompleted, setStepsCompleted] = useState<Array<number>>([]);
    const [data, setData] = useState({});
    const [editMileStone, setEditMileStone] = useState(0 as number);
    const [milestones, setMileStones] = useState([
        { milestone_name: "Here! - 1", isPhotoevidence: true, recommended_hours: "34", from_date: "04-30-2021", to_date: "" },
        { from_date: "04-29-2021", isPhotoevidence: true, milestone_name: "Here! - 2", recommended_hours: "344", to_date: "04-30-2021" },
        {}
    ]);
    const [forceupdate, setForceUpdate] = useState({});

    const getCategories = useCallback(async () => {
        const { categories: categoriesData } = await callCategories();
        setCategoriesData(categoriesData);
    }, []);

    useEffect(() => {
        getCategories();
        callTradeList();
    }, [getCategories, callTradeList, milestones]);

    const handleStepComplete = (stepData: any) => {
        setData((prevData) => ({
            ...prevData,
            ...stepData
        }))
        setStepsCompleted((prevSteps) => prevSteps.concat(step));
        setStep((prevStep) => prevStep + 1);
    };

    const newMileStoneScreen = (index: any) => {
        let milestone_clone: any = milestones;
        console.log({ index }, '------>><<')
        if (!milestone_clone[index]) {
            milestone_clone[index] = {}
        }
        console.log({ milestone_clone })
        setMileStones(milestone_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    const handleStepMileStone = (data: any, index: any) => {
        let milestone_clone: any = milestones;
        console.log({ data, index })
        milestone_clone[index]['milestone_name'] = data.milestone_name;
        milestone_clone[index]['isPhotoevidence'] = data.isPhotoevidence;
        milestone_clone[index]['recommended_hours'] = data.recommended_hours;
        console.log({ milestone_clone }, '---check In handleStepMileStone')
        setMileStones(milestone_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    const addTimeToMileStone = (time: any, index: any) => {
        let milestone_clone: any = milestones;
        milestone_clone[index]['from_date'] = time.from_date;
        milestone_clone[index]['to_date'] = time.to_date;
        console.log({ milestone_clone }) // added milestones here!
        setMileStones(milestone_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    const handleCombineMileStones = () => {
        let data_items: any = [];
        data_items.milestones = milestones;
        setMileStones(data_items);
    }

    const updateMileStoneTimings = (timings: any, index: number) => {
        let data_items: any = [];
        let milestone_clone: any = milestones;

        if (milestone_clone) {
            //
        }
    }

    const handleStepBack = () => setStep((prevStep) => prevStep - 1);
    const handleStepForward = (step: any, edit_item?: number) => {
        if (!step) {
            setStep((prevStep) => prevStep + 1)
            setEditMileStone(0);
        } else {
            console.log({ edit_item, step, forceupdate, force: Array.isArray(forceupdate) }, '-------- 107')
            if (edit_item) {
                setEditMileStone(edit_item);
                setForceUpdate([]);
                // Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
            }
            setStep(step);
        }
    };

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
                    stepCompleted={stepsCompleted.includes(4)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />
            );
            break;
        case 5:
            page = (
                <ChooseTiming
                    data={data}
                    stepCompleted={stepsCompleted.includes(5)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />
            );
            break;
        case 6:
            page = (
                <JobMilestones
                    data={data}
                    milestones={milestones}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(6)}
                    updateMileStoneIndex={updateMileStoneIndex}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />
            );
            break;
        case 7:
            page = (
                <AddMilestone
                    data={data}
                    milestones={milestones}
                    newMileStoneScreen={newMileStoneScreen}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(7)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                    handleStepMileStone={handleStepMileStone}
                />)
            break;
        case 8:
            page = (
                <ChooseTimingMileStone
                    data={data}
                    addTimeToMileStone={addTimeToMileStone}
                    milestones={milestones}
                    handleStepMileStone={handleStepMileStone}
                    stepCompleted={stepsCompleted.includes(7.1)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />
            )
            break;
        case 9:
            page = (
                <MileStoneTemplates
                    data={data}
                    stepCompleted={stepsCompleted.includes(9)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                />
            )
            break;
        case 10:
            page = (
                <SaveTemplate
                    data={data}
                    stepCompleted={stepsCompleted.includes(8)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 11:
            page = (
                <TemplateSavedSuccess
                    data={data}
                    stepCompleted={stepsCompleted.includes(8)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 12:
            page = (
                <JobPostedSuccess
                    data={data}
                    stepCompleted={stepsCompleted.includes(8)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 13:
            page = (
                <UploadMedia
                    data={data}
                    stepCompleted={stepsCompleted.includes(8)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 14:
            page = (
                <JobDetails
                    data={data}
                    stepCompleted={stepsCompleted.includes(8)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                />
            )
            break;
        case 15:
            page = (
                <EditMilestone
                    data={data}
                    milestones={milestones}
                    editMileStone={editMilestoneId}
                    newMileStoneScreen={newMileStoneScreen}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(7)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                    handleStepMileStone={handleStepMileStone}
                />
            )
            break;
        default:
            page = null;
    }

    return <div>{page}</div>;
};

export default PostJob;
