def two_oldest_ages(ages):
    """Return two distinct oldest ages as tuple (second-oldest, oldest)..

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """

    # NOTE: don't worry about an optimized runtime here; it's fine if
    # you have a runtime worse than O(n)

    # NOTE: you can sort lists with lst.sort(), which works in place (mutates);
    # you may find it helpful to research the `sorted(iter)` function, which
    # can take *any* type of list-like-thing, and returns a new, sorted list
    # from it.

    old1 = 0
    old2 = 0

    for num in ages: 
        if num > old1:
            old1 = num
    for num in ages:
        if num < old1 and num > old2:
            old2 = num
    return (old2, old1)


    # PRETY COOL!
    # find two oldest by sorting unique; this is O(n log n)

    ## Created a unique set of numbers
    # uniq_ages = set(ages)
    ## sorted the set from lowest to highest AND slices the last two off of it
    # oldest = sorted(uniq_ages)[-2:]
    ## returns as a tuple
    # return tuple(oldest)