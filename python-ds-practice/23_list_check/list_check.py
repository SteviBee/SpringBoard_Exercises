from typing import Counter


def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    counter = []
    
    for each in lst:
        if isinstance(each, list):
            counter.append(True)
        else:
            counter.append(False)

    return all(counter)