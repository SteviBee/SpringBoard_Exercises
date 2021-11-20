def count_up(start, stop):
    """Print all numbers from start up to and including stop.

    For example:

        count_up(5, 7)

   should print:

        5
        6
        7
    """

    # YOUR CODE HERE
    x = range(start, stop)
    for num in x:
        print (num)

    # for num in range(start):
        # if num == stop:
            # return
        # else:
            # print(num)


count_up(5, 7)        
