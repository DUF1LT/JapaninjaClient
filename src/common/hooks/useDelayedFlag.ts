import { useEffect, useState } from 'react';


export function useDelayedFlag(delay: number, dependencies: boolean[]) {
    const [delayedFlag, setDelayedFlag] = useState(false);

    let timeout: ReturnType<typeof setTimeout>;

    useEffect(() => {
        if (dependencies.every(Boolean)) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timeout = setTimeout(() => {
                setDelayedFlag(true);
            }, delay);
        } else {
            clearTimeout(timeout);
            setDelayedFlag(false);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [dependencies]);

    return delayedFlag;
}
