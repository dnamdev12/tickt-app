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
import { callCategories } from '../../redux/jobs/actions';
import moment from 'moment';
import { setShowToast } from '../../redux/common/actions';

interface Proptypes {
    callTradeList: () => void;
    tradeListData: Array<any>;
    editMilestoneId: any;
    editMilestoneTiming: any;
    editDetailPage: any;
    isLoading: any,
    history: any,
    builderProfile: any,
    updateMileStoneIndex: (data: any) => void;
    updateMileStoneTimings: (data: any) => void;
    updateDetailScreen: (data: any) => void;
}

const PostJob = (props: Proptypes) => {
    const {
        callTradeList,
        isLoading,
        tradeListData,
        updateMileStoneIndex,
        updateMileStoneTimings,
        updateDetailScreen,
        editMilestoneTiming,
        editDetailPage,
        builderProfile,
        editMilestoneId } = props;
    const [categoriesData, setCategoriesData] = useState([]);
    const [step, setStep] = useState(1);
    const [stepsCompleted, setStepsCompleted] = useState<Array<number>>([]);
    const [data, setData] = useState({});
    const [editMileStone, setEditMileStone] = useState(0 as number);
    const [milestones, setMileStones] = useState([]);
    const [forceupdate, setForceUpdate] = useState({});

    const getCategories = useCallback(async () => {
        const { categories: categoriesData } = await callCategories();
        setCategoriesData(categoriesData);
    }, []);

    useEffect(() => {
        getCategories();
        callTradeList();
    }, [getCategories, callTradeList, milestones]);

    const clearParentStates = () => {
        setData({});
        setMileStones([]);
        setStepsCompleted([]);
    }

    const handleStepComplete = (stepData: any) => {
        setData((prevData) => ({
            ...prevData,
            ...stepData
        }))
        setStepsCompleted((prevSteps) => prevSteps.concat(step));
        setStep((prevStep) => prevStep + 1);
    };

    const handleStepJustUpdate = (stepData: any, goto?: any) => {
        setData((prevData) => ({
            ...prevData,
            ...stepData
        }));

        if (goto === true) {
            handleStepForward(14);
        }

        if (goto !== true && goto > 0) {
            handleStepForward(goto)
        }
    }

    const newMileStoneScreen = (index: any) => {
        let milestone_clone: any = milestones;
        if (!milestone_clone[index]) {
            milestone_clone[index] = {}
        }
        setMileStones(milestone_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    const handleStepMileStone = (data: any, index: any) => {
        let milestone_clone: any = milestones;
        milestone_clone[index]['milestone_name'] = data.milestone_name;
        milestone_clone[index]['isPhotoevidence'] = data.isPhotoevidence;
        milestone_clone[index]['recommended_hours'] = data.recommended_hours;
        setMileStones(milestone_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    // const addTimeToMileStone = (time: any, index: any, skip: any) => {
    //     let milestone_clone: any = milestones;
    //     let checkIsValid: any = true;
    //     if (!skip && milestone_clone?.length) {
    //         let filter_milestone: any = milestone_clone.filter((item_mile: any, index_mile: any) => index_mile !== index);
    //         if (filter_milestone?.length) {
    //             filter_milestone.forEach((mile: any) => {
    //                 let validStart = moment(mile.from_date).isValid();
    //                 let validEnd = moment(mile.to_date).isValid();

    //                 let validStartInput = moment(time.from_date).isValid();
    //                 let validEndInput = moment(time.to_date).isValid();

    //                 if (validStart && validEnd) {
    //                     if (validStartInput && validEndInput) {
    //                         if (moment(time.from_date).isSameOrAfter(mile.from_date) && moment(time.to_date).isSameOrBefore(mile.to_date)) {
    //                             checkIsValid = false
    //                         }
    //                     }

    //                     if (validStartInput) {
    //                         // if (moment(time.from_date).add(1, 'day').isBetween(mile.from_date, mile.to_date)) {
    //                         if (moment(time.from_date).isSameOrAfter(mile.from_date) && moment(time.from_date).isSameOrBefore(mile.to_date)) {
    //                             checkIsValid = false
    //                         }
    //                     }

    //                     if (validEndInput) {
    //                         // if (moment(time.to_date).add(1, 'day').isBetween(mile.from_date, mile.to_date)) {
    //                         if (moment(time.to_date).isSameOrAfter(mile.from_date) && moment(time.to_date).isSameOrBefore(mile.to_date)) {
    //                             checkIsValid = false
    //                         }
    //                     }
    //                 }

    //                 if (validStart && validStartInput && !validEnd) {
    //                     if (moment(time.from_date).isSame(mile.from_date)) {
    //                         checkIsValid = false
    //                     }
    //                 }

    //                 if (validEnd && validEndInput && !validStart) {
    //                     if (moment(time.to_date).isSame(mile.to_date)) {
    //                         checkIsValid = false
    //                     }
    //                 }
    //             })
    //         }
    //     }

    //     if (!checkIsValid) {
    //         setShowToast(true, 'Please add unique date.');
    //         return;
    //     }

    //     milestone_clone[index]['from_date'] = time.from_date;
    //     milestone_clone[index]['to_date'] = time.to_date;
    //     setMileStones(milestone_clone);
    //     Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    // }

    const addTimeToMileStone = (time: any, index: any, skip: any) => {
        const default_format = 'MM-DD-YYYY';
        let milestone_clone: any = milestones;
        let checkIsValid: any = true;

        if (!skip && milestone_clone?.length) {

            let filter_milestone: any = milestone_clone.filter((item_mile: any, index_mile: any) => index_mile !== index);

            if (filter_milestone?.length) {
                filter_milestone.forEach((mile: any) => {
                    let msw = moment(mile.from_date).isValid();
                    let mew = moment(mile.to_date).isValid();

                    let tsw = moment(time.from_date).isValid();
                    let tew = moment(time.to_date).isValid();

                    let mile_start = mile.from_date;
                    let mile_end = mile.to_date;

                    let time_start = time.from_date;
                    let time_end = time.to_date;

                    if (msw && mew) {
                        if (tsw && tew) {
                            let checkIfSame = moment(time_start, default_format).isSame(moment(mile_start, default_format)) && moment(time_end, default_format).isSame(moment(mile_end, default_format));

                            if (checkIfSame) {
                                checkIsValid = true;
                            }

                            if (!checkIfSame) {
                                if (
                                    moment(time_start, default_format).isSameOrAfter(moment(mile_start, default_format)) &&
                                    moment(time_start, default_format).isSameOrBefore(moment(mile_end, default_format)) 
                                 ) {
                                    checkIsValid = false;
                                 }

                                 if (
                                    moment(time_end, default_format).isSameOrAfter(moment(mile_start, default_format)) &&
                                    moment(time_end, default_format).isSameOrBefore(moment(mile_end, default_format)) 
                                 ) {
                                    checkIsValid = false;
                                 }
                            }
                        }

                        if (!tew) {
                            if (moment(time_start, default_format).isSameOrAfter(moment(mile_start, default_format)) && moment(time_start, default_format).isSameOrBefore(moment(mile_start, default_format))) {
                                checkIsValid = false;
                            }
                        }
                    }

                    // here conditions
                })
            }
        }

        if (!checkIsValid) {
            setShowToast(true, 'Please add unique date.');
            return;
        }

        milestone_clone[index]['from_date'] = time.from_date;
        milestone_clone[index]['to_date'] = time.to_date;
        setMileStones(milestone_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    const handleCombineMileStones = (item: any) => {
        let milestone_clone: any = milestones;
        let data_clone: any = data;
        milestone_clone = item;
        data_clone['milestones'] = item;
        setMileStones(milestone_clone);
        setData(data_clone);
    }

    const removeMilestoneByIndex = (index: any) => {
        let milestone_clone: any = milestones;
        let data_clone: any = data;
        milestone_clone.splice(index, 1);
        data_clone['milestones'] = milestone_clone;
        setMileStones(milestone_clone);
        setData(data_clone);
        Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
    }

    const handleStepBack = () => setStep((prevStep) => prevStep - 1);
    const handleStepForward = (step: any, edit_item?: number) => {
        if (!step) {
            setStep((prevStep) => prevStep + 1)
            setEditMileStone(0);
        } else {
            if (edit_item) {
                setStep(step)
                setEditMileStone(edit_item);
                Array.isArray(forceupdate) ? setForceUpdate({}) : setForceUpdate([]);
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
                    handleStepForward={handleStepForward}
                    handleStepJustUpdate={handleStepJustUpdate}
                    editDetailPage={editDetailPage}
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
                    handleStepJustUpdate={handleStepJustUpdate}
                    editDetailPage={editDetailPage}
                    data={data}
                    stepCompleted={stepsCompleted.includes(2)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
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
                    milestones={milestones}
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
                    handleStepJustUpdate={handleStepJustUpdate}
                    editDetailPage={editDetailPage}
                    editMileStone={editMilestoneId}
                    editMilestoneTiming={editMilestoneTiming}
                    removeMilestoneByIndex={removeMilestoneByIndex}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(6)}
                    handleCombineMileStones={handleCombineMileStones}
                    updateMileStoneIndex={updateMileStoneIndex}
                    newMileStoneScreen={newMileStoneScreen}
                    updateMileStoneTimings={updateMileStoneTimings}
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
                    removeMilestoneByIndex={removeMilestoneByIndex}
                    updateMileStoneIndex={updateMileStoneIndex}
                    handleStepMileStone={handleStepMileStone}
                />)
            break;
        case 8:
            page = (
                <ChooseTimingMileStone
                    data={data}
                    addTimeToMileStone={addTimeToMileStone}
                    editMileStone={editMilestoneId}
                    editMilestoneTiming={editMilestoneTiming}
                    updateMileStoneTimings={updateMileStoneTimings}
                    milestones={milestones}
                    handleStepMileStone={handleStepMileStone}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(8)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />
            )
            break;
        case 9:
            page = (
                <MileStoneTemplates
                    {...props}
                    data={data}
                    handleCombineMileStones={handleCombineMileStones}
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
                    milestones={milestones}
                    handleCombineMileStones={handleCombineMileStones}
                    stepCompleted={stepsCompleted.includes(10)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 11:
            page = (
                <TemplateSavedSuccess
                    data={data}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(11)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 12:
            page = (
                <JobPostedSuccess
                    history={props.history}
                    data={data}
                    editDetailPage={editDetailPage}
                    stepCompleted={stepsCompleted.includes(12)}
                    handleStepComplete={handleStepComplete}
                    handleStepBack={handleStepBack}
                    handleStepForward={handleStepForward}
                />)
            break;
        case 13:
            page = (
                <UploadMedia
                    data={data}
                    stepCompleted={stepsCompleted.includes(13)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                />)
            break;
        case 14:
            page = (
                <JobDetails
                    data={data}
                    milestones={milestones}
                    categories={tradeListData}
                    jobTypes={categoriesData}
                    builderProfile={builderProfile}
                    clearParentStates={clearParentStates}
                    stepCompleted={stepsCompleted.includes(14)}
                    handleStepComplete={handleStepComplete}
                    handleStepForward={handleStepForward}
                    handleStepBack={handleStepBack}
                    updateDetailScreen={updateDetailScreen}
                />
            )
            break;
        case 15:
            page = (
                <EditMilestone
                    data={data}
                    milestones={milestones}
                    editMileStone={editMilestoneId}
                    editMilestoneTiming={editMilestoneTiming}
                    addTimeToMileStone={addTimeToMileStone}
                    newMileStoneScreen={newMileStoneScreen}
                    handleStepForward={handleStepForward}
                    stepCompleted={stepsCompleted.includes(15)}
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
