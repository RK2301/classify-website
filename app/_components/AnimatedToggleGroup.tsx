'use client';

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';

// Define the types for the component props
export interface ToggleOption {
    value: string;
    label: string | React.ReactNode;
}

interface AnimatedToggleGroupProps {
    options: ToggleOption[];
    defaultValue?: string;
    onChange: (value: string) => void;
    containerClassName?: string;
    buttonClassName?: string;
    /**whenever to show border around the toggle group */
    border?: boolean
}

/**
 * A reusable animated toggle group component.
 * It uses framer-motion to animate the background of the selected option.
 * @param options - An array of objects with `value` and `label` properties.
 * @param defaultValue - The initial value to be selected.
 * @param onChange - A callback function that is called when the selection changes.
 * @param containerClassName - Optional CSS classes for the main container.
 * @param buttonClassName - Optional CSS classes for the buttons.
 */
const AnimatedToggleGroup: React.FC<AnimatedToggleGroupProps> = ({
    options,
    defaultValue,
    onChange,
    containerClassName = '',
    buttonClassName = '',
    border
}) => {
    const [activeValue, setActiveValue] = useState(defaultValue || options[0]?.value);
    // Generate a unique ID for each instance of the component to isolate animations.
    const id = useId();

    const handleToggle = (value: string) => {
        setActiveValue(value);
        onChange(value);
    };

    return (
        <div className={`relative flex w-full items-center rounded-full bg-gray-100 p-1 dark:bg-gray-800 
        ${border ? 'border border-[var(--color-grey-200)]' : ''} ${containerClassName}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleToggle(option.value)}
                    className={`relative flex-1 py-2 px-1 text-center text-sm font-medium
                         transition-colors duration-300 ease-in-out focus:outline-none ${buttonClassName} ${activeValue === option.value ? 'text-brand-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    {/* The span ensures the text is above the animated div */}
                    <span className="relative z-10">{option.label}</span>

                    {/* The animated highlight, rendered only for the active button */}
                    {activeValue === option.value && (
                        <motion.div
                            // Use the unique instance ID for the layoutId to prevent animation conflicts
                            layoutId={id}
                            className="absolute inset-0 z-0 rounded-full bg-white shadow-md dark:bg-gray-900"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default AnimatedToggleGroup