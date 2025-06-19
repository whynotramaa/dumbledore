

'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '@/public/icons/loading.json'; // adjust path based on location

export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
            <Lottie
                animationData={loadingAnimation}
                loop
                autoplay
                className="w-42 h-42"
            />
        </div>
    );
}
