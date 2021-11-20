def in_range(nums, lowest, highest):
    """Print numbers inside range.

    - nums: list of numbers
    - lowest: lowest number to print
    - highest: highest number to print

    For example:

      in_range([10, 20, 30, 40], 15, 30)

    should print:

      20 fits
      30 fits
    """
    # YOUR CODE HERE
    # for number in range(6):
    #   print(number)
    in_range_values = []

    for num in nums:
      if num > lowest and num < highest:
        in_range_values.append(num)
    
    for good_val in in_range_values:
      print (good_val)


in_range([10, 20, 30, 40, 50], 15, 30)     
in_range([10, 20, 30, 40, 50], 1, 40)       
