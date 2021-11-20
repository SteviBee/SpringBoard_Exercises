def print_upper_words(words, starts_with):
    """Prints all words that start with the letters param"""
    answer = []

    for word in words:
        if word.startswith(starts_with):
            answer.append(word)

    print (answer)

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], "y")