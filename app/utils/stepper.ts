

export const getStepCount = (post: Trip) => {
    const statusLower = post?.status?.toLowerCase();

    if (statusLower === 'posted') return 1;
    if (statusLower === 'posted') return 2;
    if (statusLower === 'completed') return 3;
    if (statusLower === 'canceled') return 3;

    // Default to 1 step for unknown statuses
    return 1;
};

