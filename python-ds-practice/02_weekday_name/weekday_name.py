def weekday_name(day_of_week):
    """Return name of weekday.
    
        >>> weekday_name(1)
        'Sunday'
        
        >>> weekday_name(7)
        'Saturday'
        
    For days not between 1 and 7, return None
    
        >>> weekday_name(9)
        >>> weekday_name(0)
    """
    list_of_days = {1: "Sunday", 2: "Monday", 3: "Tuesday", 4:"Wed", 5: "Thursday", 6: "Friday", 7: "Saturday"}
    return list_of_days.get(day_of_week)