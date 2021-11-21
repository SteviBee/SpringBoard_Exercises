def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    # MUCH quicker way: VOWELS = set("aeiou")
    vowel = {"a", "e", "i", "o", "u"}
    answer = {}
    lower_phrase = phrase.lower()

    for ltr in lower_phrase:
        if ltr in vowel:
            if ltr in answer:
                answer[ltr] = answer[ltr] + 1
            else:
                answer[ltr] = 1
    return answer

    #   for ltr in phrase:
    #     if ltr in VOWELS:
    #         counter[ltr] = counter.get(ltr, 0) + 1