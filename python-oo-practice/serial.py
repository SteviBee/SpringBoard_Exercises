"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.start = start
        self.placeholder = start

    def __repr__(self):
        """Show representation."""

        return f"<SerialGenerator start={self.start}"

    def generate(self):
        "adds one to the stored number "
        new_val = self.start + 1
        self.start = new_val

        return new_val

    def reset(self):
        "resets start value back to OG input"
        self.start = self.placeholder
        return f"number is now reset to OG input {self.start}"

    # @classmethod
    # def generate(cls, start_val):
    #     "adds one to the stored number "
    #     self.start = (self, )
    #     new_val = start_val + 1

    #     return new_val
        

#   class Date(object):

#     def __init__(self, day=0, month=0, year=0):
#         self.day = day
#         self.month = month
#         self.year = year

#     @classmethod
#     def from_string(cls, date_as_string):
#         day, month, year = map(int, date_as_string.split('-'))
#         date1 = cls(day, month, year)
#         return date1 
