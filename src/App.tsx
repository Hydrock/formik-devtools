import React, { useEffect, useState } from 'react';
import { FormikState, StatusPanel } from './components';

import { useMessageLoad } from './hooks/useMessageLoad';
import { IFormikState } from './interfaces/formikState';
import { parceValues } from './parcers/values-parcer';

interface AppProps {
    readyPing: () => void;
}

// const __mockMessages = [
//     // JSON.stringify({
//     //     values: { test: 1 },
//     //     initValues: { test: 1 },
//     //     errors: { test: 'error !!!' },
//     //     touched: { test: true },
//     // }),
//     JSON.stringify({
//         values: {
//             test: { test: { c: [{ c3: { c4: { c5: { c6: 5 } } } }], d: null } },
//             test1: { test: { c: [{ c3: { c4: { c5: { c6: 5 } } } }], d: null } },
//         },
//         initValues: { test: 1 },
//         errors: { test1: 'aaaaa' },
//         touched: { test: true },
//     }),
// ];

const App: React.FunctionComponent<AppProps> = ({ readyPing }) => {
    const [formikStates, setFormikStates] = useState<IFormikState[]>([]);
    const [currentStep, setCurrentStep] = useState(0);

    const { message: newMessage } = useMessageLoad();

    useEffect(() => {
        readyPing();
    }, [readyPing]);

    // useEffect(() => {
    //     // mock
    //     const states = __mockMessages.map((newMessage) => {
    //         const newState = parceValues(newMessage) as IFormikState;
    //         return newState;
    //     });
    //     // setFormikStates([...states]);
    //     setCurrentStep(states.length - 1);
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        if (newMessage) {
            const newState = parceValues(newMessage);
            if (newState) {
                setFormikStates([...formikStates, newState]);
                setCurrentStep(formikStates.length);
            }
        }
        // eslint-disable-next-line
    }, [newMessage]);

    const setNextStep = () => {
        if (currentStep < formikStates.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const setPreviousStep = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="app-w">
            <StatusPanel
                currentStep={currentStep + 1}
                steps={formikStates.length + 1}
                setNextStep={setNextStep}
                setPreviousStep={setPreviousStep}
            />
            {formikStates[currentStep] && <FormikState formikState={formikStates[currentStep]} />}
        </div>
    );
};

export default App;