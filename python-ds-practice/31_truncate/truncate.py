from types import resolve_bases


def truncate(phrase, n):
    """Return truncated-at-n-chars version of  phrase.
    
    If the phrase is longer than, or the same size as, n make sure it ends with '...' and is no
    longer than n.
    
        >>> truncate("Hello World", 6)
        'Hel...'
        
        >>> truncate("Problem solving is the best!", 10)
        'Problem...'
        
        >>> truncate("Yo", 100)
        'Yo'
        
    The smallest legal value of n is 3; if less, return a message:
    
        >>> truncate('Cool', 1)
        'Truncation must be at least 3 characters.'

        >>> truncate("Woah", 4)
        'W...'

        >>> truncate("Woah", 3)
        '...'
    """
    result = ""
    if n < 3:
        result = 'Truncation must be at least 3 characters.'
    elif n == 3:
        result =  "..."
    elif len(phrase) < n:
        result =  phrase
    else:
        i = 0
        while len(result) < (n-3):          
            result += phrase[i]
            i += 1
        result += "..."
    return result

    # SLick: for the string phrase param, slice it from index 0 -> n - 3, THEN add "..."
    # return phrase[:n - 3] + "..."