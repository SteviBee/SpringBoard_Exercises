def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    # counter = {}
    
    # for num in nums:
    #     counter[num] = counter.get(nums.count(num))
        

    # lst.sort()
    # return lst.pop(0)
    c = 0
    ans = 0

    for n in nums:
        if nums.count(n) > c:
            ans = n
    return ans