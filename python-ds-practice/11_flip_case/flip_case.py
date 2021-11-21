def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """


    # Flipping capital functionality:
    new_string = []
    for ltr in phrase:
        if ltr.lower() == to_swap.lower():
            if ltr.isupper():
                new_string.append(ltr.lower())
            else:
                new_string.append(ltr.upper())
        else:
            new_string.append(ltr)
    return "".join(new_string)