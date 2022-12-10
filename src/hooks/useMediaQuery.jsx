import { useCallback, useEffect, useState } from 'react';

export function useMediaQuery(query) {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
        if (e.matches) setTargetReached(true)
        else setTargetReached(false)
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const media = window.matchMedia(query)
        media.addEventListener('change', updateTarget)

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) setTargetReached(true)

        return () => media.removeEventListener('change', updateTarget)
    });

    return targetReached;
}