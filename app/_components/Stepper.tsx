// components/ui/Stepper.tsx

'use client';

import { Check } from 'lucide-react';
import type { FC } from 'react';

// Define the types for the component props
interface Step {
    title: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number; // Use 0-based indexing for the current step
}

const Stepper: FC<StepperProps> = ({ steps, currentStep }) => {
    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
            <div className="relative flex items-center justify-between">
                {/* The underlying grey line, now using logical properties */}
                <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-gray-300 dark:bg-gray-700"></div>

                {/* The brand-colored progress line. 
            CHANGE: Switched from 'left-0' to 'start-0' to support RTL */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 h-1 bg-brand-500 transition-all duration-500 ease-in-out start-0"
                    style={{ width: `${(100 / (steps.length - 1)) * currentStep}%` }}
                ></div>

                {/* Map over the steps to create the circles */}
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isUpcoming = index > currentStep;

                    return (
                        <div key={step.title} className="relative z-10">
                            <div
                                className={`
                  w-10 h-10 sm:w-12 sm:h-12 
                  rounded-full flex items-center justify-center 
                  font-bold text-lg 
                  transition-colors duration-300 ease-in-out
                  ${isCompleted || isCurrent ? 'bg-brand-500 text-white' : ''}
                  ${isUpcoming ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : ''}
                `}
                            >
                                {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Step Labels */}
            <div className="mt-4 flex justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div
                            key={`label-${step.title}`}
                            className={`
                text-sm sm:text-base w-1/3 transition-colors duration-300 ease-in-out
                ${isCompleted || isCurrent ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-500'}
                
                // CHANGE: Replaced inline style with logical text-alignment classes
                ${index === 0 ? 'text-start' : ''}
                ${index === steps.length - 1 ? 'text-end' : ''}
                ${index > 0 && index < steps.length - 1 ? 'text-center' : ''}
              `}
                        >
                            {step.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;