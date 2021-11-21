def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    set1 = set(str(num1))
    set2 = set(str(num2))
  
    result = set1 - set2

    if len(result) > 0:
        return False
    else:
        return True

    