def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    # unq_set = set(matrix)
    lst = []
    total = 0
    for x in matrix:
        lst.append(list(x))
    length_of_matrix = len(matrix)

    if length_of_matrix == 2:
        tl = lst[0][0] + lst[1][1]
        br = lst[0][1] + lst[1][0]
        total = tl + br

    if length_of_matrix == 3:
        tl = lst[0][0] + lst[1][1] + lst[2][2]
        br = lst[2][0] + lst[1][1] + lst[0][2]
        total = tl + br

    return total

    # FIGURE THIS ONE OUT LATER:

    # total = 0

    # for i in range(len(matrix)):
    #     total += matrix[i][i]
    #     total += matrix[i][-1 - i]

    # return total