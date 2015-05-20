'''Serve a data-driven list of club members.'''
__author__ = 'Alexander Otavka'


import os
import logging

import webapp2
import jinja2


CURRENT_DIR = os.path.dirname(__file__)
JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(CURRENT_DIR),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

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
                member = {
                    'name': format_name(dir_str),
                    'page': '/roster/member/{}'.format(dir_str),
                }
                members.append(member)
                
        template_values = {
            'members': members
        }
        template = JINJA_ENVIRONMENT.get_template('roster.html')
        self.response.write(template.render(template_values))

class MemberPageHandler(webapp2.RequestHandler):
    def get(self, name):
        try:
            f = open(CURRENT_DIR + '/club-members/{}/index.html'.format(name), 'r')
        except IOError:
            self.abort(404)
        out = ' '.join(f.readlines())
        f.close()
        self.response.write(out)
        
app = webapp2.WSGIApplication([
    (r'/roster/all', RosterListHandler),
    (r'/roster/member/(\w+)', MemberPageHandler),
], debug=True)