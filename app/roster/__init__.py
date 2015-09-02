'''Serve a data-driven list of club members.'''
__author__ = 'Alexander Otavka'


import os
import logging
import json

import webapp2


CURRENT_DIR = os.path.dirname(__file__)

def format_name(name):
    formatted = ''
    for char in name:
        if char == '_':
            formatted += ' '
        else:
            formatted += char
    return formatted

class RosterListHandler(webapp2.RequestHandler):
    def get(self):
        dir_list = os.listdir(CURRENT_DIR + '/club-members')
        members = []
        for dir_str in dir_list:
            if not dir_str[0] == '.':
                name = format_name(dir_str)
                members.append(name)

        members = sorted(members)
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(members))

app = webapp2.WSGIApplication([
    ('/roster/listmembers', RosterListHandler),
], debug=True)
