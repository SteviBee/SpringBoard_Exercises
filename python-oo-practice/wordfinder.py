"""Word Finder: finds random words from a dictionary."""
# file = open("words.txt", "r")
# list_of_words = file.readlines()
# counter = 0
# for i in list_of_words:
#     if i:
#         counter += 1
# print(f"{counter} words read")
import random

class WordFinder:
    def __init__(self):
        # self.list_of_words = list_of_words
        self.parse_file()
    

    def parse_file(self):
        file = open("words.txt", "r")
        self.list_of_words = file.readlines()
        counter = 0
        for i in self.list_of_words:
            if i:
                counter += 1
        print(f"{counter} words read")
        file.close()

    def random(self):
        print(random.choice(self.list_of_words))

class SpecialWordFinder(WordFinder):
    def __init__(self):
        super().__init__(self.parse_file())

    def parse_file(self):
        file = open("words.txt", "r")
        self.list_of_words = file.readlines()
        counter = 0
        for i in self.list_of_words:
            if i:
                counter += 1
        print(f"{counter} words read")
        file.close()

    def parse(self):
        return [w.strip() for w in self.list_of_words
            if w.strip() and not w.startswith("#")]
        
# import random
# lines = open('file.txt').read().splitlines()
# myline =random.choice(lines)
# print(myline)
