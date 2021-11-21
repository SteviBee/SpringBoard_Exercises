def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    og = phrase[0]
    new = og.upper()
    return phrase.replace(og, new, 1)